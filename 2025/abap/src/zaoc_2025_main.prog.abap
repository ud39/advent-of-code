*&---------------------------------------------------------------------*
*& Report zaoc_2025_main
*&---------------------------------------------------------------------*
*&
*&---------------------------------------------------------------------*
REPORT zaoc_2025_main.

DATA(lv_file) = zaoc_read_input=>select_input_file( ).

IF lv_file IS NOT INITIAL.
  DATA(rt_input) = zaoc_read_input=>parse_input( iv_filename = lv_file-file_path ).
ENDIF.

zaoc_2025_1=>calculate_smallest_dist(
  EXPORTING
    it_ids = rt_input
  RECEIVING
    rt_sum = DATA(lv_solution)
).

cl_demo_output=>display_text( text = lv_solution ).
