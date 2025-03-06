import random
import string
import json

# Function to generate a random alphanumeric string for 'gene'
def generate_gene():
    length = random.randint(3, 10)
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

# Function to generate a random transcript string
def generate_transcript():
    num_items = random.randint(1, 3)  # Between 1 to 3 transcript items
    transcripts = []
    
    for _ in range(num_items):
        transcript_item = f"uc{random.randint(100, 999)}{random.choice(string.ascii_lowercase)}{random.choice(string.ascii_lowercase)}{random.choice(string.ascii_lowercase)}.{random.randint(1, 9)}"
        transcripts.append(transcript_item)
    
    return ','.join(transcripts)

# Function to generate random numbers for 'exper_rep' and 'control_rep'
def generate_replicates(num_reps):
    return [round(random.uniform(0.00, 5000.00), 2) for _ in range(num_reps)]

# Function to generate the full JSON array
def generate_json_array(num_items, num_reps):
  data = []
  for _ in range(num_items):
    item = {
      "gene": generate_gene(),
      "transcript": generate_transcript()
    }
    for i in range(1, num_reps + 1):
      item[f"exper_rep{i}"] = generate_replicates(num_reps)[i-1]
    data.append(item)
    for i in range(1, num_reps + 1):
      item[f"control_rep{i}"] = generate_replicates(num_reps)[i-1]
  return data

# Function to write JSON data to a file
def write_to_file(data):
    with open('sample.json', 'w') as file:
        json.dump(data, file, indent=2)

# Example usage: Generate 5 items with 3 replicates each
num_items = 50
num_reps = 3
json_data = generate_json_array(num_items, num_reps)

# Write the generated JSON data to sample.json
write_to_file(json_data)

print("Data has been written to sample.json.")
