import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://raw.githubusercontent.com/DashAISoftware/dashAI/develop/docs/static/';
const INSTITUTIONS_URL = `${BASE_URL}institutions/institutions.json`;
const OUTPUT_PATH = path.join(__dirname, '..', 'lib', 'institutions-data.json');
const LOGO_DIR = path.join(__dirname, '..', 'public', 'institutions');

async function downloadLogo(logoPath) {
  if (!logoPath) return null;
  const fileName = path.basename(logoPath);
  const dest = path.join(LOGO_DIR, fileName);
  const url = `${BASE_URL}${logoPath}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`  ! Logo ${fileName} failed: ${res.status} ${res.statusText}`);
      return null;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(dest, buf);
    console.log(`  ✓ Logo ${fileName}`);
    return fileName;
  } catch (err) {
    console.warn(`  ! Logo ${fileName} error: ${err.message}`);
    return null;
  }
}

async function fetchInstitutions() {
  try {
    console.log(`Fetching institutions from ${INSTITUTIONS_URL}...`);
    const response = await fetch(INSTITUTIONS_URL);

    if (!response.ok) {
      throw new Error(`Failed to fetch institutions: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Ensure dirs exist
    fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
    fs.mkdirSync(LOGO_DIR, { recursive: true });

    // Collect every logo path (institutions + acknowledgment funder logos)
    const records = [
      ...(data.institutions || []),
      ...(data.acknowledgments?.logos || []),
    ];

    console.log(`Downloading ${records.length} logos...`);
    await Promise.all(
      records.map(async (rec) => {
        const fileName = await downloadLogo(rec.logo);
        // Rewrite logo to the local public path so the app serves it directly
        if (fileName) rec.logo = `institutions/${fileName}`;
      })
    );

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(data, null, 2));
    console.log(`✓ Institutions data saved to ${OUTPUT_PATH}`);

    return data;
  } catch (error) {
    console.error('✗ Error fetching institutions:', error.message);
    process.exit(1);
  }
}

fetchInstitutions();
