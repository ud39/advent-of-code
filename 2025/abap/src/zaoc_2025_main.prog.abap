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

DATA(lv_product) = zaoc_2025_3=>get_product_of_muls( iv_instructions = rt_input ).

cl_demo_output=>display_text( text = |{ lv_product }| ).
