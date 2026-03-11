import urllib.request
import re

url = "https://upload.wikimedia.org/wikipedia/commons/e/ea/Blank_map_of_Colombia.svg"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as response:
        svg_content = response.read().decode('utf-8')
        
    # Simplify presentation: set fill to #4b4e53 and stroke to white
    # Just output the raw first 1000 characters to see the structure
    print(svg_content[:1000])
    
    with open('assets/mapa-colombia.svg', 'w', encoding='utf-8') as f:
        f.write(svg_content)
    print("Saved to assets/mapa-colombia.svg")
except Exception as e:
    print("Error:", e)
