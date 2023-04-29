interface Resource {
  login_page_name: string;
  login_page_userName_placeHolder: string;
  login_page_password_placeHolder: string;
  login_page_login_button_text: string;
  home_page_name: string;
  search_input_default_placeholder: string;
  home_page_rank_column: string;
  home_page_player_name_column: string;
  home_page_country_column: string;
  home_page_money_column: string;
  data_grid_group_toggle_on: string;
  data_grid_group_toggle_off: string;
  home_page_data_grid_group_criteria_country: string;
  home_page_logout_button_text: string;
  layout_change_language_button_text: string;
  data_grid_empty_state_text: string;
}

export type ResourceKey = keyof Resource;

export default Resource;
