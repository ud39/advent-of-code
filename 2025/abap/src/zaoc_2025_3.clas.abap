CLASS zaoc_2025_3 DEFINITION
  PUBLIC FINAL
  CREATE PUBLIC.

  PUBLIC SECTION.
    TYPES: BEGIN OF ls_numbers,
             num TYPE int4,
           END OF ls_numbers.
    TYPES lt_numbers TYPE STANDARD TABLE OF ls_numbers WITH EMPTY KEY.

    CLASS-METHODS get_product_of_muls IMPORTING iv_instructions    TYPE string_table
                                      RETURNING VALUE(rv_solution) TYPE int4.

    CLASS-METHODS get_mult_numbers IMPORTING iv_instructions   TYPE string_table
                                   RETURNING VALUE(rv_numbers) TYPE lt_numbers.

    CLASS-METHODS get_mult_numbers_do_dont IMPORTING iv_instructions   TYPE string_table
                                           RETURNING VALUE(rv_numbers) TYPE lt_numbers.

    CLASS-METHODS mult_numbers IMPORTING it_numbers         TYPE lt_numbers
                               RETURNING VALUE(rv_solution) TYPE int4.

    CLASS-METHODS valid_mul IMPORTING iv_mul           TYPE string
                            RETURNING VALUE(rv_is_mul) TYPE abap_bool.

    CLASS-METHODS get_do_pos IMPORTING iv_instruction         TYPE string
                             RETURNING VALUE(rt_match_do_tab) TYPE match_result_tab.

    CLASS-METHODS get_dont_pos IMPORTING iv_instruction           TYPE string
                               RETURNING VALUE(rt_match_dont_tab) TYPE match_result_tab.

    CLASS-METHODS switch_do_dont IMPORTING iv_offset                TYPE int4
                                           iv_instruction           TYPE string
                                           iv_dont_pos              TYPE int4
                                           iv_do_pos                TYPE int4
                                 CHANGING  cv_current_do_match      TYPE int4 DEFAULT -1
                                           cv_current_dont_match    TYPE int4 DEFAULT -1
                                 RETURNING VALUE(rv_should_collect) TYPE abap_bool.
ENDCLASS.


CLASS zaoc_2025_3 IMPLEMENTATION.
  METHOD get_mult_numbers.
    DATA(lo_matcher_mul) = cl_abap_regex=>create_pcre( pattern     = '(.|[^\\w\\s])?mul\('
                                                       ignore_case = 'X' ).
    LOOP AT iv_instructions ASSIGNING FIELD-SYMBOL(<fs_instruction>).
      " TODO: variable is assigned but never used (ABAP cleaner)
      DATA lt_debug TYPE string_table.
      DATA(lo_match_mul) = lo_matcher_mul->create_matcher( text = <fs_instruction> ).
      WHILE lo_match_mul->find_next( ).
        DATA(lv_offset) = lo_match_mul->get_offset( ).

        DATA(lv_check) = find( val  = <fs_instruction>
                               occ  = 1
                               off  = lv_offset + 5
                               len  = strlen( <fs_instruction> ) - lv_offset - 5
                               pcre = '\(' ).

        DATA(lv_opening) = find( val  = <fs_instruction>
                                 off  = lv_offset + 1
                                 pcre = '\(' ).
        DATA(lv_closing) = find( val  = <fs_instruction>
                                 off  = lv_offset + 1
                                 pcre = '\)' ).
        IF lv_closing > lv_check AND lv_check <> -1. CONTINUE. ENDIF.

        DATA(lv_mul) = substring( val = <fs_instruction>
                                  off = lv_opening + 1
                                  len = lv_closing - lv_opening - 1 ).
        IF valid_mul( iv_mul = lv_mul  ) = abap_false. CONTINUE. ENDIF.

        APPEND lv_mul TO lt_debug.
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
    rv_solution = mult_numbers( it_numbers = get_mult_numbers_do_dont( iv_instructions = iv_instructions  ) ).
  ENDMETHOD.

  METHOD get_dont_pos.
    DATA(lo_matcher_dont) = cl_abap_regex=>create_pcre( pattern =  '(.|[^\\w\\s])?don''t\(\)(.|[^\\w\\s])?' ).
    DATA(lo_match_dont) = lo_matcher_dont->create_matcher( text = iv_instruction ).
    rt_match_dont_tab = lo_match_dont->find_all(  ).
  ENDMETHOD.

  METHOD get_do_pos.
    DATA(lo_matcher_do) = cl_abap_regex=>create_pcre( pattern = '(.|[^\\w\\s])?do\(\)(.|[^\\w\\s])?' ).
    DATA(lo_match_do) = lo_matcher_do->create_matcher( text = iv_instruction ).
    rt_match_do_tab = lo_match_do->find_all(  ).
  ENDMETHOD.

  METHOD get_mult_numbers_do_dont.
    DATA(lo_matcher_mul) = cl_abap_regex=>create_pcre( pattern     = '(.|[^\\w\\s])?mul\('
                                                       ignore_case = 'X' ).

    DATA(lv_collect_do_dont) = abap_true.
    LOOP AT iv_instructions ASSIGNING FIELD-SYMBOL(<fs_instruction>).
      " TODO: variable is assigned but never used (ABAP cleaner)
      DATA lt_debug TYPE string_table.
      DATA(lv_dont) = get_dont_pos( iv_instruction = <fs_instruction>  ).
      DATA(lv_do) = get_do_pos( iv_instruction = <fs_instruction> ).
      DATA(lo_match_mul) = lo_matcher_mul->create_matcher( text = <fs_instruction> ).
      WHILE lo_match_mul->find_next( ).
        DATA(lv_offset) = lo_match_mul->get_offset( ).

        IF sy-tabix <> 1.
          lv_collect_do_dont = switch_do_dont( EXPORTING iv_offset      = lv_offset
                                                         iv_instruction = <fs_instruction>
                                                         iv_dont_pos    = lv_dont[ 1 ]-offset
                                                         iv_do_pos      = lv_do[ 1 ]-offset ).
        ENDIF.

        IF lv_collect_do_dont = abap_false. CONTINUE. ENDIF.

        DATA(lv_check) = find( val  = <fs_instruction>
                               occ  = 1
                               off  = lv_offset + 5
                               len  = strlen( <fs_instruction> ) - lv_offset - 5
                               pcre = '\(' ).

        DATA(lv_opening) = find( val  = <fs_instruction>
                                 off  = lv_offset + 1
                                 pcre = '\(' ).
        DATA(lv_closing) = find( val  = <fs_instruction>
                                 off  = lv_offset + 1
                                 pcre = '\)' ).
        IF lv_closing > lv_check AND lv_check <> -1. CONTINUE. ENDIF.

        DATA(lv_mul) = substring( val = <fs_instruction>
                                  off = lv_opening + 1
                                  len = lv_closing - lv_opening - 1 ).
        IF valid_mul( iv_mul = lv_mul  ) = abap_false. CONTINUE. ENDIF.

        APPEND lv_mul TO lt_debug.
        SPLIT lv_mul AT ',' INTO DATA(lv_num1) DATA(lv_num2).
        IF lv_num1 IS INITIAL OR lv_num2 IS INITIAL. CONTINUE. ENDIF.

        APPEND VALUE #( num = lv_num1 ) TO rv_numbers.
        APPEND VALUE #( num = lv_num2 ) TO rv_numbers.
      ENDWHILE.
    ENDLOOP.
  ENDMETHOD.

  METHOD switch_do_dont.
    rv_should_collect = COND #( WHEN iv_dont_pos <= iv_do_pos
                                 AND iv_dont_pos <= iv_offset
                                 AND iv_do_pos    > iv_offset
                                THEN abap_false
                                ELSE abap_true ).
    IF rv_should_collect = abap_true.
        cv_current_dont_match += 1.
        cv_current_do_match += 1.
    ENDIF.
  ENDMETHOD.
ENDCLASS.
