import fitz
import os

files = [
    r"D:\Projects\FarmerLift\PROJECT ENGAGEMENT DOSSIER Farmerlift.pdf",
    r"D:\Projects\FarmerLift\Project Engagement Dossier.pdf",
    r"D:\Projects\FarmerLift\FUNCTIONAL SITE MAP FARMERLIFT.pdf",
]

out_path = r"D:\Projects\FarmerLift\farmer-lift-client\tmp_dossier_output.txt"

with open(out_path, "w", encoding="utf-8") as f:
    for filepath in files:
        if not os.path.exists(filepath):
            f.write(f"\n{'='*60}\n")
            f.write(f"FILE NOT FOUND: {filepath}\n")
            continue
        
        f.write(f"\n{'='*60}\n")
        f.write(f"FILE: {os.path.basename(filepath)}\n")
        f.write(f"{'='*60}\n")
        
        doc = fitz.open(filepath)
        for i, page in enumerate(doc):
            f.write(f"\n--- PAGE {i+1} of {len(doc)} ---\n")
            f.write(page.get_text())

print(f"Done! Written to {out_path}")
