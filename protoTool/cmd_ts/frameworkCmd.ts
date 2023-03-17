export let CMD_FRAMEWORK:{[key:string]:number}= {} 
export let CMD2PB_FRAMEWORK:{[key:number]:{name:string,mainID:number,aID:number,pak:string,file:string}} = {}
//c2s_g_login
CMD_FRAMEWORK.c2s_g_login=10000020
CMD2PB_FRAMEWORK[10000020]={name:"c2s_g_login", mainID:100,aID:2,pak:"pb_game_manage.cs_room_logon", file:"pb_game_manage" }
//s2c_g_login_ok
CMD_FRAMEWORK.s2c_g_login_ok=10000021
CMD2PB_FRAMEWORK[10000021]={name:"s2c_g_login_ok", mainID:100,aID:2,pak:"pb_game_manage.sc_room_logon_result", file:"pb_game_manage" }
//s2c_g_login_err
CMD_FRAMEWORK.s2c_g_login_err=10000031
CMD2PB_FRAMEWORK[10000031]={name:"s2c_g_login_err", mainID:100,aID:3,pak:"", file:"pb_game_manage" }
//s2c_g_login_finish
CMD_FRAMEWORK.s2c_g_login_finish=10000041
CMD2PB_FRAMEWORK[10000041]={name:"s2c_g_login_finish", mainID:100,aID:4,pak:"", file:"pb_game_manage" }
//s2c_g_logout_rep
CMD_FRAMEWORK.s2c_g_logout_rep=10000221
CMD2PB_FRAMEWORK[10000221]={name:"s2c_g_logout_rep", mainID:100,aID:22,pak:"", file:"pb_cmd" }
//s2c_up
CMD_FRAMEWORK.s2c_up=10200011
CMD2PB_FRAMEWORK[10200011]={name:"s2c_up", mainID:102,aID:1,pak:"pb_game_manage.sc_other_userSit", file:"pb_game_manage" }
//s2c_up_err
CMD_FRAMEWORK.s2c_up_err=10200351
CMD2PB_FRAMEWORK[10200351]={name:"s2c_up_err", mainID:102,aID:35,pak:"", file:"pb_game_manage" }
//c2s_sit
CMD_FRAMEWORK.c2s_sit=10200020
CMD2PB_FRAMEWORK[10200020]={name:"c2s_sit", mainID:102,aID:2,pak:"pb_game_manage.cs_user_sitDesk", file:"pb_game_manage" }
//s2c_sit
CMD_FRAMEWORK.s2c_sit=10200021
CMD2PB_FRAMEWORK[10200021]={name:"s2c_sit", mainID:102,aID:2,pak:"pb_game_manage.sc_other_userSit", file:"pb_game_manage" }
//s2c_sit_err
CMD_FRAMEWORK.s2c_sit_err=10200081
CMD2PB_FRAMEWORK[10200081]={name:"s2c_sit_err", mainID:102,aID:8,pak:"", file:"pb_game_manage" }
//s2c_g_player_in
CMD_FRAMEWORK.s2c_g_player_in=10200051
CMD2PB_FRAMEWORK[10200051]={name:"s2c_g_player_in", mainID:102,aID:5,pak:"pb_game_manage.noitfy_user_info", file:"pb_game_manage" }
//s2c_g_player_out
CMD_FRAMEWORK.s2c_g_player_out=10200061
CMD2PB_FRAMEWORK[10200061]={name:"s2c_g_player_out", mainID:102,aID:6,pak:"pb_game_manage.sc_other_userSit", file:"pb_game_manage" }
//s2c_g_player_off
CMD_FRAMEWORK.s2c_g_player_off=10200071
CMD2PB_FRAMEWORK[10200071]={name:"s2c_g_player_off", mainID:102,aID:7,pak:"pb_game_manage.sc_other_userCut", file:"pb_game_manage" }
//c2s_change_table
CMD_FRAMEWORK.c2s_change_table=10200280
CMD2PB_FRAMEWORK[10200280]={name:"c2s_change_table", mainID:102,aID:28,pak:"", file:"pb_cmd" }
//s2c_change_table
CMD_FRAMEWORK.s2c_change_table=10200281
CMD2PB_FRAMEWORK[10200281]={name:"s2c_change_table", mainID:102,aID:28,pak:"", file:"pb_game_manage" }
//c2s_auto_sit
CMD_FRAMEWORK.c2s_auto_sit=10200270
CMD2PB_FRAMEWORK[10200270]={name:"c2s_auto_sit", mainID:102,aID:27,pak:"", file:"pb_cmd" }
//c2s_g_exit
CMD_FRAMEWORK.c2s_g_exit=10200310
CMD2PB_FRAMEWORK[10200310]={name:"c2s_g_exit", mainID:102,aID:31,pak:"", file:"pb_cmd" }
//s2c_g_exit
CMD_FRAMEWORK.s2c_g_exit=10200311
CMD2PB_FRAMEWORK[10200311]={name:"s2c_g_exit", mainID:102,aID:31,pak:"", file:"pb_cmd" }
//s2c_g_base
CMD_FRAMEWORK.s2c_g_base=15000011
CMD2PB_FRAMEWORK[15000011]={name:"s2c_g_base", mainID:150,aID:1,pak:"pb_game_manage.sc_game_info", file:"pb_game_manage" }
//c2s_g_state
CMD_FRAMEWORK.c2s_g_state=15000020
CMD2PB_FRAMEWORK[15000020]={name:"c2s_g_state", mainID:150,aID:2,pak:"", file:"pb_cmd" }
//s2c_g_state
CMD_FRAMEWORK.s2c_g_state=15000021
CMD2PB_FRAMEWORK[15000021]={name:"s2c_g_state", mainID:150,aID:2,pak:"", file:"" }
//s2c_jp
CMD_FRAMEWORK.s2c_jp=15000031
CMD2PB_FRAMEWORK[15000031]={name:"s2c_jp", mainID:150,aID:3,pak:"pb_game_manage.notify_game_jackpot", file:"pb_game_manage" }
//s2c_notice
CMD_FRAMEWORK.s2c_notice=15000041
CMD2PB_FRAMEWORK[15000041]={name:"s2c_notice", mainID:150,aID:4,pak:"pb_game_manage.notify_game_win_score_notice_msg", file:"pb_game_manage" }
//s2c_bet_list
CMD_FRAMEWORK.s2c_bet_list=15000051
CMD2PB_FRAMEWORK[15000051]={name:"s2c_bet_list", mainID:150,aID:5,pak:"pb_game_manage.notify_game_grade_info", file:"pb_game_manage" }
//c2s_change_bet
CMD_FRAMEWORK.c2s_change_bet=15000060
CMD2PB_FRAMEWORK[15000060]={name:"c2s_change_bet", mainID:150,aID:6,pak:"pb_game_manage.cs_game_switch_bet", file:"pb_game_manage" }
//s2c_change_bet
CMD_FRAMEWORK.s2c_change_bet=15000071
CMD2PB_FRAMEWORK[15000071]={name:"s2c_change_bet", mainID:150,aID:7,pak:"pb_game_manage.sc_game_switch_bet", file:"pb_game_manage" }
//c2s_winner
CMD_FRAMEWORK.c2s_winner=15000090
CMD2PB_FRAMEWORK[15000090]={name:"c2s_winner", mainID:150,aID:9,pak:"", file:"pb_cmd" }
//s2c_winner
CMD_FRAMEWORK.s2c_winner=15000101
CMD2PB_FRAMEWORK[15000101]={name:"s2c_winner", mainID:150,aID:10,pak:"pb_game_manage.sc_jackpot_winner_list", file:"pb_game_manage" }
//s2c_profile_update
CMD_FRAMEWORK.s2c_profile_update=15000081
CMD2PB_FRAMEWORK[15000081]={name:"s2c_profile_update", mainID:150,aID:8,pak:"pb_game_manage.notify_userinfo_update", file:"pb_game_manage" }
//s2c_forbid
CMD_FRAMEWORK.s2c_forbid=15000111
CMD2PB_FRAMEWORK[15000111]={name:"s2c_forbid", mainID:150,aID:11,pak:"pb_game_manage.sc_bet_forbid_msg", file:"pb_game_manage" }
//s2c_kick_warn
CMD_FRAMEWORK.s2c_kick_warn=15000121
CMD2PB_FRAMEWORK[15000121]={name:"s2c_kick_warn", mainID:150,aID:12,pak:"pb_game_manage.notify_kick_warn_msg", file:"pb_game_manage" }
//s2c_g_charge
CMD_FRAMEWORK.s2c_g_charge=15000131
CMD2PB_FRAMEWORK[15000131]={name:"s2c_g_charge", mainID:150,aID:13,pak:"pb_game_manage.notify_user_recharge_result_info", file:"pb_game_manage" }
//s2c_table_info
CMD_FRAMEWORK.s2c_table_info=15000161
CMD2PB_FRAMEWORK[15000161]={name:"s2c_table_info", mainID:150,aID:16,pak:"", file:"" }
