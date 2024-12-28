CLASS zaoc_2025_3 DEFINITION
  PUBLIC FINAL
  CREATE PUBLIC.

  PUBLIC SECTION.
    TYPES: BEGIN OF ls_numbers,
           num TYPE int4,
           END OF LS_NUMBERS.
    TYPES lt_numbers TYPE STANDARD TABLE OF ls_numbers WITH EMPTY KEY.

    CLASS-METHODS get_product_of_muls IMPORTING iv_instructions TYPE string_table
                                      RETURNING VALUE(rv_solution) TYPE int4.
    CLASS-METHODS get_mult_numbers IMPORTING iv_instructions   TYPE string_table
                                   RETURNING VALUE(rv_numbers) TYPE lt_numbers.
    CLASS-METHODS mult_numbers IMPORTING it_numbers         TYPE lt_numbers
                               RETURNING VALUE(rv_solution) TYPE int4.
    CLASS-METHODS valid_mul  IMPORTING iv_mul TYPE string
                             RETURNING VALUE(rv_is_mul) TYPE abap_bool.
ENDCLASS.


CLASS zaoc_2025_3 IMPLEMENTATION.
  METHOD get_mult_numbers.
    DATA(lo_matcher_mul) = cl_abap_regex=>create_pcre( pattern     = '(.|\))mul\('
                                                       ignore_case = 'X' ).
    LOOP AT iv_instructions ASSIGNING FIELD-SYMBOL(<fs_instruction>).

      DATA(lo_match_mul) = lo_matcher_mul->create_matcher( text = <fs_instruction> ).
      WHILE lo_match_mul->find_next( ).
        DATA(lv_offset) = lo_match_mul->get_offset( ).

        DATA(lv_check) = find( val  = <fs_instruction>
                               occ  = 1
                               off  = lv_offset + 5
                               len  = strlen( <fs_instruction> ) - lv_offset - 5
                               pcre = '\(' ).
        DATA(lv_closing) = find( val  = <fs_instruction>
                                 off  = lv_offset + 1
                                 pcre = '\)' ).
        IF lv_closing > lv_check AND lv_check <> -1. CONTINUE. ENDIF.

        DATA(lv_mul) = substring( val = <fs_instruction>
                                  off = lv_offset + 5
                                  len = lv_closing - lv_offset - 5 ).
        IF valid_mul( iv_mul = lv_mul  ) = abap_false. CONTINUE. ENDIF.

        SPLIT lv_mul AT ',' INTO DATA(lv_num1) DATA(lv_num2).
        IF lv_num1 IS INITIAL OR lv_num2 IS INITIAL. CONTINUE. ENDIF.

        APPEND VALUE #( num = lv_num1 ) TO rv_numbers.
        APPEND VALUE #( num = lv_num2 ) TO rv_numbers.
      ENDWHILE.
    ENDLOOP.
  ENDMETHOD.

  METHOD valid_mul.
    DATA(lo_matcher_numbers) = cl_abap_regex=>create_pcre( pattern     = '\d+\,\d+'
                                                       ignore_case = 'X' ).
    DATA(lo_match_numbers) = lo_matcher_numbers->create_matcher( text = iv_mul ).
    IF lo_match_numbers->find_next( ).
        rv_is_mul = abap_true.
    ENDIF.
  ENDMETHOD.

  METHOD mult_numbers.
    rv_solution = REDUCE int4(
                    INIT total = 0
                    FOR i = 1 THEN i + 2 UNTIL i >= lines( it_numbers )
                    NEXT total = total +
                        COND int4(
                          WHEN line_exists( it_numbers[ i ] ) AND line_exists( it_numbers[ i + 1 ] )
                          THEN it_numbers[ i ]-num * it_numbers[ i + 1 ]-num
                          ELSE 0 ) ).
  ENDMETHOD.

  METHOD get_product_of_muls.
    rv_solution = mult_numbers( it_numbers = get_mult_numbers( iv_instructions = iv_instructions  ) ).
  ENDMETHOD.

ENDCLASS.
