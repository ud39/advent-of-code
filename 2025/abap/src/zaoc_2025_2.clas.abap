CLASS zaoc_2025_2 DEFINITION
  PUBLIC FINAL
  CREATE PUBLIC.

  PUBLIC SECTION.
    CLASS-METHODS check_distance_bounded
      IMPORTING iv_upper_limit TYPE int4
                iv_lower_limit TYPE int4
                iv_fst_num     TYPE int4
                iv_snd_num     TYPE int4
      RETURNING VALUE(rv_bool) TYPE abap_bool.

    CLASS-METHODS check_report_validity
      IMPORTING it_rep          TYPE int4_table
      RETURNING VALUE(rv_valid) TYPE abap_bool.

    CLASS-METHODS calc_unsafe_reports
      IMPORTING it_reports         TYPE stringtab
      RETURNING VALUE(rv_solution) TYPE char0032.

ENDCLASS.


CLASS zaoc_2025_2 IMPLEMENTATION.
  METHOD check_distance_bounded.
    rv_bool = abap_true.

    IF iv_fst_num = iv_snd_num.
      rv_bool = abap_false.
      RETURN.
    ENDIF.

    DATA(lv_dist) = CONV string( abs( iv_snd_num - iv_fst_num ) ).
    IF    iv_lower_limit > lv_dist
       OR iv_upper_limit < lv_dist.
      rv_bool = abap_false.
    ENDIF.
  ENDMETHOD.

  METHOD calc_unsafe_reports.
    DATA lt_num TYPE TABLE OF int4.

    DATA(lo_matcher) = cl_abap_regex=>create_pcre( pattern     = '\d+'
                                                   ignore_case = 'X' ).

    LOOP AT it_reports ASSIGNING FIELD-SYMBOL(<fv_rep>).
      CLEAR lt_num.
      DATA(lo_match) = lo_matcher->create_matcher( text = <fv_rep> ).
      WHILE lo_match->find_next( ).
        DATA(lv_offset) = lo_match->get_offset( ).
        DATA(lv_len) = lo_match->get_length( ).
        INSERT CONV int4( <fv_rep>+lv_offset(lv_len) ) INTO TABLE lt_num.
      ENDWHILE.
      DATA(lv_valid) = check_report_validity( it_rep = lt_num ).
      IF lv_valid = abap_true.
        rv_solution += 1.
      ENDIF.
    ENDLOOP.
  ENDMETHOD.

  METHOD check_report_validity.
    DATA(lv_marked_order) = 'AAA'.
    DATA(lv_index) = 1.
    DO lines( it_rep ) - 1 TIMES.
      rv_valid = check_distance_bounded( iv_upper_limit = '3'
                                         iv_lower_limit = '1'
                                         iv_fst_num     = it_rep[ lv_index ]
                                         iv_snd_num     = it_rep[ lv_index + 1 ] ).
      IF rv_valid = abap_false.
        RETURN.
      ENDIF.

      IF it_rep[ lv_index ] < it_rep[ lv_index + 1 ].
        IF lv_marked_order = 'DEC'.
          rv_valid = abap_false.
          RETURN.
        ENDIF.
        lv_marked_order = 'INC'.
      ELSEIF it_rep[ lv_index ] > it_rep[ lv_index + 1 ].
        IF lv_marked_order = 'INC'.
          rv_valid = abap_false.
          RETURN.
        ENDIF.
        lv_marked_order = 'DEC'.
      ENDIF.
      lv_index += 1.
    ENDDO.
  ENDMETHOD.
ENDCLASS.
