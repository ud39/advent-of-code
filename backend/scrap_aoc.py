import os
import requests
from bs4 import BeautifulSoup
from dotenv import load_dotenv


def get_data(year: int, day: int) -> object:

    load_dotenv()
    cookie_name = os.getenv('COOKIE_NAME')
    cookie_value = os.getenv('COOKIE_VALUE')

    session = requests.Session()
    cookie = {'name': cookie_name, 'value': cookie_value}
    session.cookies.set(**cookie)

    url = 'https://adventofcode.com/' + str(year) + '/day/' + str(day)
    adventDay = {}

    resp = session.get(url=url)

    html_content = resp.content
    soup = BeautifulSoup(html_content, 'html.parser')

    year = year
    day = day
    title = soup.find('h2')
    example = soup.find('code')

    url_input = 'https://adventofcode.com/' + str(year) + '/day/' + str(day) + '/input'
    resp = session.get(url=url_input)
    html_content = resp.content

    soup = BeautifulSoup(html_content, 'html.parser')

    adventDay['day'] = day
    adventDay['example'] = example.text
    adventDay['title'] = title.text
    adventDay['year'] = year
    adventDay['input'] = soup.text

    return adventDay
