CLASS zaoc_2025_3 DEFINITION
  PUBLIC FINAL
  CREATE PUBLIC.

  PUBLIC SECTION.
    CLASS-METHODS get_mult_numbers IMPORTING iv_instructions   TYPE string_table
                                   RETURNING VALUE(rv_numbers) TYPE int4_table.

    CLASS-METHODS mult_numbers IMPORTING iv_numbers         TYPE int4_table
                               RETURNING VALUE(rv_solution) TYPE int4.
ENDCLASS.


CLASS zaoc_2025_3 IMPLEMENTATION.
  METHOD get_mult_numbers.
    DATA(lo_matcher_mul) = cl_abap_regex=>create_pcre( pattern     = '.mul\('
                                                       ignore_case = 'X' ).
    LOOP AT iv_instructions ASSIGNING FIELD-SYMBOL(<fs_instruction>).

      DATA(lo_match_mul) = lo_matcher_mul->create_matcher( text = <fs_instruction> ).
      WHILE lo_match_mul->find_next( ).
        DATA(lv_offset) = lo_match_mul->get_offset( ).
        DATA(lv_length) = lo_match_mul->get_length( ).
        DATA(lv_check) = find( val  = <fs_instruction>+lv_offset
                               pcre = '\(' ).
        DATA(lv_closing) = find( val  = <fs_instruction>+lv_offset
                                 pcre = '\)' ).
        IF lv_check >= 0 AND lv_closing > lv_check.
          DATA(lv_mul) = substring( val = <fs_instruction>
                                    off = lv_offset + 1
                                    len = lv_closing + 1 ).
        ENDIF.
        BREAK-POINT.
      ENDWHILE.
    ENDLOOP.
  ENDMETHOD.

  METHOD mult_numbers.
  ENDMETHOD.
ENDCLASS.
