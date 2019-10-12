import requests

headers = {
    'cookie': 'tt_webid=6733433706118645255; _ba=BA0.2-20190715-5199e-QqB6RFRD55LGCyF6rutq; _ga=GA1.2.112943905.1567749701; _gid=GA1.2.1759399160.1570588785',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'zh-CN,zh;q=0.9',
    'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_1_2 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Version/7.0 Mobile/11D257 Safari/9537.53',
    'accept': 'application/json',
    'referer': 'https://www.iesdouyin.com/share/user/86044891889',
    'authority': 'www.iesdouyin.com',
    'x-requested-with': 'XMLHttpRequest',
}

params = (
    ('user_id', '86044891889'),
    ('sec_uid', ''),
    ('count', '21'),
    ('max_cursor', '0'),
    ('aid', '1128'),
    ('_signature', '0M2EpxASjXXZgf6yrkCKktDNhL'),
    ('dytk', '3905df2f69a6a6561a9da86e08b69e20'),
)

response = requests.get('https://www.iesdouyin.com/web/api/v2/aweme/like/', headers=headers, params=params)
print response.text
#NB. Original query string below. It seems impossible to parse and
#reproduce query strings 100% accurately so the one below is given
#in case the reproduced version is not "correct".
# response = requests.get('https://www.iesdouyin.com/web/api/v2/aweme/like/?user_id=86044891889&sec_uid=&count=21&max_cursor=0&aid=1128&_signature=0M2EpxASjXXZgf6yrkCKktDNhL&dytk=3905df2f69a6a6561a9da86e08b69e20', headers=headers)
