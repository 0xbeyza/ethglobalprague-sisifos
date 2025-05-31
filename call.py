import requests
from dotenv import load_dotenv
import os

load_dotenv()



headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {os.getenv('BLOCKSCOUT_API_KEY')}"

}
address = "0x2B9f07d447e40dD0a061Aa2DfaA9e7F79046623E"

def get_user_info(address):
    url = f"https://merits-staging.blockscout.com/api/v1/auth/user/{address}"
    response = requests.get(url, headers=headers)
    return response.json()

def get_user_ranking(address):
    url=f"https://merits-staging.blockscout.com/api/v1/leaderboard/users/{address}"
    response = requests.get(url, headers=headers)
    data = response.json()
    return data["rank"]
def get_partner_info():
    url=f"https://merits-staging.blockscout.com/partner/api/v1/balance"
    response = requests.get(url, headers=headers)
    data = response.json()
    return data

def distribute_rewards():
