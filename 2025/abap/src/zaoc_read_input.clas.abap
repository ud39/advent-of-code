CLASS zaoc_read_input DEFINITION
  PUBLIC FINAL
  CREATE PUBLIC.

  PUBLIC SECTION.
    TYPES: BEGIN OF ty_file_info,
             file_path TYPE string, " Full path to the file
             file_name TYPE string, " File name only
           END OF ty_file_info.

    CLASS-METHODS parse_input
      IMPORTING iv_filename     TYPE string
      RETURNING VALUE(rt_input) TYPE stringtab.

    CLASS-METHODS select_input_file
      RETURNING VALUE(rt_file) TYPE ty_file_info.
  PRIVATE SECTION.
    CLASS-METHODS get_basename
                  IMPORTING iv_filepath TYPE string
                  RETURNING VALUE(rv_basename) TYPE string.
    ENDCLASS.


CLASS zaoc_read_input IMPLEMENTATION.
  METHOD parse_input.
    cl_gui_frontend_services=>gui_upload( EXPORTING  filename                = iv_filename
                                                     filetype                = 'ASC'
                                          CHANGING   data_tab                = rt_input
                                          EXCEPTIONS file_open_error         = 1
                                                     file_read_error         = 2
                                                     no_batch                = 3
                                                     gui_refuse_filetransfer = 4
                                                     invalid_type            = 5
                                                     no_authority            = 6
                                                     unknown_error           = 7
                                                     bad_data_format         = 8
                                                     header_not_allowed      = 9
                                                     separator_not_allowed   = 10
                                                     header_too_long         = 11
                                                     unknown_dp_error        = 12
                                                     access_denied           = 13
                                                     dp_out_of_memory        = 14
                                                     disk_full               = 15
                                                     dp_timeout              = 16
                                                     not_supported_by_gui    = 17
                                                     error_no_gui            = 18
                                                     OTHERS                  = 19 ).
    IF sy-subrc <> 0.
      MESSAGE ID sy-msgid TYPE sy-msgty NUMBER sy-msgno
              WITH sy-msgv1 sy-msgv2 sy-msgv3 sy-msgv4.
    ENDIF.
  ENDMETHOD.

  METHOD select_input_file.
    DATA lv_rc        TYPE i.
    DATA lt_filetable TYPE filetable.
    DATA ls_file_info TYPE ty_file_info.

    " Open file selection dialog
    cl_gui_frontend_services=>file_open_dialog( EXPORTING  window_title = 'Select Input File'
                                                           file_filter  = 'Text Files (*.txt)|*.txt|All Files (*.*)|*.*'
                                                CHANGING   file_table   = lt_filetable
                                                           rc           = lv_rc
                                                EXCEPTIONS OTHERS       = 1 ).

    " Check the result of the dialog
    IF sy-subrc = 0 AND lv_rc > 0.
      " Select the first file from the returned list
      READ TABLE lt_filetable INTO DATA(lv_file_path) INDEX 1.

      IF sy-subrc = 0.
        ls_file_info-file_path = lv_file_path.
        rt_file = ls_file_info. " Return the selected file info
      ELSE.
        MESSAGE 'No file selected!' TYPE 'E'.
      ENDIF.
    ELSE.
      MESSAGE 'File selection canceled!' TYPE 'I'.
    ENDIF.
  ENDMETHOD.

  METHOD get_basename.
  ENDMETHOD.
ENDCLASS.
