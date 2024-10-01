import subprocess
import re
import requests

def install_and_run_slither(contract_path):
    
    try:
        # Install Solc version 0.8.4 using solc-select
        subprocess.run(["solc-select", "install", "0.8.4"])

        # Use Solc version 0.8.4
        subprocess.run(["solc-select", "use", "0.8.4"])

        # Construct the slither analyze command
        slither_cmd = ['slither', contract_path, '--checklist']

        # Run the command and capture the output, redirecting it to result2.md
        with open('./results.md', 'w') as result_file:
            subprocess.run(slither_cmd, stdout=result_file, stderr=subprocess.PIPE, text=True, check=True)

    except subprocess.CalledProcessError as e:
        # Handle errors, if any
        print(f"Error running a command: {e}")
def extract_vulnerabilities(markdown_content):
    # Define a list to store the extracted vulnerabilities
    vulnerabilities = []

    # Define the regex pattern for extracting vulnerability information
    pattern = r'- \[(?P<vulnerability_name>[\w-]+)]\(#[\w-]+\)\s+(?P<results_count>\d+) results\s+(?P<severity>[\w]+)'

    # Find all matches in the markdown content
    matches = re.finditer(pattern, markdown_content)
    for match in matches:
        vulnerability = {
            "vulnerability_name": match.group("vulnerability_name"),
            "results_count": int(match.group("results_count")),
            "severity": match.group("severity")
        }
        vulnerabilities.append(vulnerability)

    return vulnerabilities

        
def send_vulnerabilities(vulnerabilities):
    url = "http://localhost:8000/api/vulnerabilities"
    data = {"vulnerabilities": vulnerabilities}
    response = requests.post(url, json=data)
    if response.status_code == 200:
        print("Vulnerabilities data sent successfully.")
    else:
        print("Failed to send vulnerabilities data.")

if __name__ == "__main__":
    # Specify the path to the Solidity contract you want to analyze
    contract_path = "../uploads/submitted.sol"

    install_and_run_slither(contract_path)

    with open("results.md", "r") as markdown_file:
        markdown_content = markdown_file.read()

    vulnerabilities = extract_vulnerabilities(markdown_content)
    send_vulnerabilities(vulnerabilities)
