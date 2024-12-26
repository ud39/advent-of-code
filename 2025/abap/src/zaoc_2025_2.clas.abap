CLASS zaoc_2025_2 DEFINITION
  PUBLIC FINAL
  CREATE PUBLIC.

  PUBLIC SECTION.
    TYPES: BEGIN OF ty_solution_line,
             is_report_valid TYPE abap_bool,
             is_report       TYPE string,
           END OF ty_solution_line.
    TYPES lt_solution TYPE STANDARD TABLE OF ty_solution_line.

    CLASS-METHODS check_distance_bounded
      IMPORTING iv_upper_limit TYPE int4
                iv_lower_limit TYPE int4
                iv_fst_num     TYPE int4
                iv_snd_num     TYPE int4
      RETURNING VALUE(rv_bool) TYPE abap_bool.

    CLASS-METHODS check_report_validity
      IMPORTING it_rep          TYPE int4_table
      RETURNING VALUE(rv_valid) TYPE abap_bool.

    CLASS-METHODS check_report_validity_tol
      IMPORTING it_rep                TYPE int4_table
                iv_correction_running TYPE abap_bool DEFAULT ''
      RETURNING VALUE(rv_valid)       TYPE abap_bool.

    CLASS-METHODS check_order
      IMPORTING iv_order        TYPE char03
                iv_cur_index    TYPE int4
                it_rep          TYPE int4_table
      RETURNING VALUE(rv_order) TYPE char03.

    CLASS-METHODS calc_unsafe_reports
      IMPORTING it_reports         TYPE stringtab
      EXPORTING et_solution        TYPE lt_solution
      RETURNING VALUE(rv_solution) TYPE char0032.

    CLASS-METHODS correct_report
      IMPORTING it_reports        TYPE int4_table
                iv_curr_index     TYPE int4
      RETURNING VALUE(rv_correct) TYPE abap_bool.

    CLASS-METHODS remove_report
      IMPORTING it_reports            TYPE int4_table
                iv_index              TYPE i
      RETURNING VALUE(rt_removed_rep) TYPE int4_table.
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
      DATA(lv_valid) = check_report_validity_tol( it_rep = lt_num ).
      DATA(lv_fst_rem) = check_report_validity_tol( it_rep                = remove_report( it_reports = lt_num
                                                                                           iv_index   = 1 )
                                                    iv_correction_running = 'X' ).
      DATA(lv_snd_rem) = check_report_validity_tol( it_rep                = remove_report( it_reports = lt_num
                                                                                           iv_index   = 2 )
                                                    iv_correction_running = 'X' ).
      IF lv_valid = abap_true.
        rv_solution += 1.
      ELSEIF lv_fst_rem = abap_true OR lv_snd_rem = abap_true.
        rv_solution += 1.
        lv_valid = abap_true.
      ENDIF.
      APPEND VALUE #( is_report_valid = lv_valid
                      is_report       = <fv_rep> ) TO et_solution.
    ENDLOOP.
  ENDMETHOD.

  METHOD check_report_validity.
      rv_valid = check_report_validity_tol( it_rep                = it_rep
                                            iv_correction_running = abap_false ).
  ENDMETHOD.

  METHOD correct_report.
    DATA(lv_corrected_current_rep) = check_report_validity_tol(
                                         it_rep                = remove_report( it_reports = it_reports
                                                                                iv_index   = iv_curr_index )
                                         iv_correction_running = 'X' ).
    DATA(lv_corrected_next_rep) = check_report_validity_tol(
                                      it_rep                = remove_report( it_reports = it_reports
                                                                             iv_index   = iv_curr_index + 1 )
                                      iv_correction_running = 'X' ).
    IF lv_corrected_current_rep = abap_true OR lv_corrected_next_rep = abap_true.
      rv_correct = abap_true.
    ENDIF.
  ENDMETHOD.

  METHOD check_order.
    IF it_rep[ iv_cur_index ] < it_rep[ iv_cur_index + 1 ].
      IF iv_order = 'DEC'.
        rv_order = abap_false.
        RETURN.
      ENDIF.
      rv_order = 'INC'.
    ELSEIF it_rep[ iv_cur_index ] > it_rep[ iv_cur_index + 1 ].
      IF iv_order = 'INC'.
        rv_order = abap_false.
        RETURN.
      ENDIF.
      rv_order = 'DEC'.
    ENDIF.
  ENDMETHOD.

  METHOD check_report_validity_tol.
    DATA(lv_marked_order) = 'AAA'.
    DATA(lv_index) = 1.
    DO lines( it_rep ) - 1 TIMES.
      rv_valid = check_distance_bounded( iv_upper_limit = '3'
                                         iv_lower_limit = '1'
                                         iv_fst_num     = it_rep[ lv_index ]
                                         iv_snd_num     = it_rep[ lv_index + 1 ] ).

      lv_marked_order = check_order( iv_order     = lv_marked_order
                                     iv_cur_index = lv_index
                                     it_rep       = it_rep ).

      IF lv_marked_order = abap_false AND iv_correction_running = abap_true.
        rv_valid = abap_false.
        RETURN.
      ENDIF.

      IF rv_valid = abap_false AND iv_correction_running = abap_true.
        RETURN.
      ENDIF.

      IF rv_valid = abap_false OR lv_marked_order = abap_false.
        IF iv_correction_running = abap_false.
          rv_valid = correct_report( it_reports    = it_rep
                                     iv_curr_index = lv_index ).
          RETURN.
        ENDIF.
      ENDIF.
      lv_index += 1.
    ENDDO.
  ENDMETHOD.

  METHOD remove_report.
    LOOP AT it_reports ASSIGNING FIELD-SYMBOL(<ls_rep>).
      IF sy-tabix <> iv_index.
        APPEND <ls_rep> TO rt_removed_rep.
      ENDIF.
    ENDLOOP.
  ENDMETHOD.
ENDCLASS.
