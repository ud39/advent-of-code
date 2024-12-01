CLASS zaoc_2025_1 DEFINITION
  PUBLIC FINAL
  CREATE PUBLIC.

  PUBLIC SECTION.
    CLASS-METHODS calculate_smallest_dist
      IMPORTING it_ids        TYPE stringtab
      RETURNING VALUE(rv_solution) TYPE char0032.

    CLASS-METHODS calculate_similarity
      IMPORTING it_ids        TYPE stringtab
      RETURNING VALUE(rv_solution) TYPE char0032.
ENDCLASS.


CLASS zaoc_2025_1 IMPLEMENTATION.
  METHOD calculate_smallest_dist.
    DATA lt_left_lst  TYPE int4_table.
    DATA lt_right_lst TYPE int4_table.

    LOOP AT it_ids ASSIGNING FIELD-SYMBOL(<fv_ids>).
      " TODO: variable is assigned but never used (ABAP cleaner)
      SPLIT <fv_ids> AT space INTO DATA(lv_left_number) DATA(lv_space) DATA(lv_space_2)
            DATA(lv_right_number).
      APPEND lv_left_number TO lt_left_lst.
      APPEND lv_right_number TO lt_right_lst.
    ENDLOOP.
    SORT lt_left_lst ASCENDING.
    SORT lt_right_lst ASCENDING.
    DATA(lv_cnt) = 1.

    LOOP AT lt_left_lst ASSIGNING FIELD-SYMBOL(<fv_id>).
      rv_solution += abs( lt_right_lst[ lv_cnt ] - <fv_id> ).
      lv_cnt += 1.
    ENDLOOP.
  ENDMETHOD.

  METHOD calculate_similarity.
    DATA lt_left_lst  TYPE int4_table.
    DATA lt_right_lst TYPE int4_table.

    LOOP AT it_ids ASSIGNING FIELD-SYMBOL(<fv_ids>).
      " TODO: variable is assigned but never used (ABAP cleaner)
      SPLIT <fv_ids> AT space INTO DATA(lv_left_number) DATA(lv_space) DATA(lv_space_2)
            DATA(lv_right_number).

      lv_left_number = CONV int4( lv_left_number ).
      lv_right_number = CONV int4( lv_right_number ).
      APPEND lv_left_number TO lt_left_lst.
      APPEND lv_right_number TO lt_right_lst.

    ENDLOOP.
    SORT lt_left_lst ASCENDING.
    SORT lt_right_lst ASCENDING.
    DATA lv_duplicates TYPE int4.

    LOOP AT lt_left_lst ASSIGNING FIELD-SYMBOL(<fv_id>).
      " TODO: variable is assigned but never used (ABAP cleaner)
      LOOP AT lt_right_lst ASSIGNING FIELD-SYMBOL(<fv_right_id>)
           WHERE table_line = <fv_id>.
        lv_duplicates += 1.
      ENDLOOP.

      rv_solution += <fv_id> * lv_duplicates.
      CLEAR lv_duplicates.
    ENDLOOP.
  ENDMETHOD.
ENDCLASS.
