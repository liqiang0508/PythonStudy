import requests

cookies = {
    '_ga': 'GA1.3.1057630433.1552393285',
    'odin_tt': 'c419ae363d629518d68346c75f251a0be97451327fa58fe66ef51700673d717ff9c96f6e821bb26622b288eec9952e46',
    'sid_guard': '917a17e77ff65e7fa2faf8eee656245c%7C1552302418%7C153612237%7CMon%2C+22-Jan-2024+09%3A10%3A55+GMT',
    'uid_tt': '091632359cbdc5a55dfb3e83f1265cc1',
    'sid_tt': '917a17e77ff65e7fa2faf8eee656245c',
    'sessionid': '917a17e77ff65e7fa2faf8eee656245c',
    'qh[360]': '1',
    'install_id': '92670922880',
    'ttreq': '1$f455c4b3f01d3624f7e1be6397671b1602af42a0',
}

headers = {
    'Host': 'aweme-hl.snssdk.com',
    'X-SS-REQ-TICKET': '1574146800142',
    'X-Tt-Token': '00917a17e77ff65e7fa2faf8eee656245cf1f347a1b44f9f6c668d9b37c467be4db54fcf84ade82a480081facf18a1ce0442',
    'sdk-version': '1',
    'X-SS-DP': '1128',
    'x-tt-trace-id': '00-8dd944267d25a0611a246492e13dbc94-8dd944267d25a061-01',
    'User-Agent': 'com.ss.android.ugc.aweme/870 (Linux; U; Android 6.0; zh_CN; M5; Build/MRA58K; Cronet/58.0.2991.0)',
    'X-Gorgon': '0300805400001be7f228d199df5f25068c61dd1e4597a8713094',
    'X-Khronos': '1574146800',
}

params = (
    ('aweme_id', '6760580574223584520'),
    ('cursor', '0'),
    ('count', '20'),
    ('address_book_access', '1'),
    ('gps_access', '1'),
    ('forward_page_type', '1'),
    ('os_api', '23'),
    ('device_type', 'M5'),
    ('device_platform', 'android'),
    ('ssmix', 'a'),
    ('iid', '92670922880'),
    ('manifest_version_code', '870'),
    ('dpi', '320'),
    ('uuid', '862484032675186'),
    ('version_code', '870'),
    ('app_name', 'aweme'),
    ('version_name', '8.7.0'),
    ('ts', '1574146800'),
    ('openudid', 'add5cb7ffa052631'),
    ('device_id', '40711014785'),
    ('resolution', '720*1280'),
    ('os_version', '6.0'),
    ('language', 'zh'),
    ('device_brand', 'Meizu'),
    ('app_type', 'normal'),
    ('ac', 'wifi'),
    ('update_version_code', '8702'),
    ('aid', '1128'),
    ('channel', 'meizu'),
    ('_rticket', '1574146800148'),
    ('mcc_mnc', '46000'),
)

response = requests.get('https://aweme-hl.snssdk.com/aweme/v2/comment/list/', headers=headers, params=params, cookies=cookies,verify = False)

print response.text
#NB. Original query string below. It seems impossible to parse and
#reproduce query strings 100% accurately so the one below is given
#in case the reproduced version is not "correct".
# response = requests.get('https://aweme-hl.snssdk.com/aweme/v2/comment/list/?aweme_id=6760580574223584520&cursor=0&count=20&address_book_access=1&gps_access=1&forward_page_type=1&os_api=23&device_type=M5&device_platform=android&ssmix=a&iid=92670922880&manifest_version_code=870&dpi=320&uuid=862484032675186&version_code=870&app_name=aweme&version_name=8.7.0&ts=1574146800&openudid=add5cb7ffa052631&device_id=40711014785&resolution=720*1280&os_version=6.0&language=zh&device_brand=Meizu&app_type=normal&ac=wifi&update_version_code=8702&aid=1128&channel=meizu&_rticket=1574146800148&mcc_mnc=46000', headers=headers, cookies=cookies)
