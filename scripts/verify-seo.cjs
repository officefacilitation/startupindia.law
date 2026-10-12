const fs = require('fs');
const files = ['index.html', 'services.html', 'work.html', 'about.html', 'contact.html', 'updates.html'];
let allOk = true;

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  
  // Title
  const titleMatch = content.match(/<title>([\s\S]*?)<\/title>/);
  const title = titleMatch ? titleMatch[1].trim().replace(/&amp;/g, '&') : '';
  
  // Description
  const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i);
  const desc = descMatch ? descMatch[1].trim().replace(/&amp;/g, '&') : '';
  
  // Robots
  const robotsMatch = content.match(/<meta\s+name=["']robots["']\s+content=["']([\s\S]*?)["']/i);
  const robots = robotsMatch ? robotsMatch[1].trim() : '';
  
  // Canonical
  const canonMatch = content.match(/<link\s+rel=["']canonical["']\s+href=["']([\s\S]*?)["']/i);
  const canon = canonMatch ? canonMatch[1].trim() : '';

  // JSON-LD
  const jsonLdRegex = /<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi;
  let m;
  let jsonCount = 0;
  let jsonValid = true;
  while ((m = jsonLdRegex.exec(content)) !== null) {
    jsonCount++;
    try {
      JSON.parse(m[1].trim());
    } catch(e) {
      jsonValid = false;
      console.error(`JSON-LD parse error in ${f}:`, e.message);
    }
  }

  console.log(`\n=== ${f} ===`);
  console.log(`Title (${title.length} chars): "${title}"`);
  console.log(`Desc (${desc.length} chars): "${desc}"`);
  console.log(`Robots: "${robots}"`);
  console.log(`Canonical: "${canon}"`);
  console.log(`JSON-LD blocks: ${jsonCount}, Valid: ${jsonValid}`);

  if (title.length > 60) {
    console.warn(`WARNING: Title exceeds 60 chars! (${title.length})`);
    allOk = false;
  }
  if (desc.length > 160) {
    console.warn(`WARNING: Description exceeds 160 chars! (${desc.length})`);
    allOk = false;
  }
  if (!jsonValid || jsonCount === 0 || !robots || !canon) {
    allOk = false;
  }
}

console.log(`\n========================================`);
console.log(`OVERALL AUDIT PASSED: ${allOk}`);
console.log(`========================================\n`);
if (!allOk) process.exit(1);
