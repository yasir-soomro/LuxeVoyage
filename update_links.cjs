const fs = require('fs');

// Patch Navbar.tsx
let navbar = fs.readFileSync('src/components/Navbar.tsx', 'utf-8');
navbar = navbar.replace(/<a/g, '<Link');
navbar = navbar.replace(/<\/a>/g, '</Link>');
// Replace motion.Link with motion.create(Link) or similar? 
// Next.js: motion.div is easier if we just wrap the Link or keep it simple. Actually we can keep standard <a href="#id"> if we want smooth scrolls inside a single page. The user just said "links are not working properly" because they didn't have IDs to scrollTo! We fixed 2 IDs (about, contact). So clicking them will work now. Let's make sure ALL links work properly. 

// The easiest way is to use next/link instead of 'a', because in Next.js, 'a' could cause full page loads, although with hash links it shouldn't.

let dest = fs.readFileSync('src/components/Destinations.tsx', 'utf-8');
if (!dest.includes('import Link')) {
  dest = "import Link from 'next/link';\n" + dest;
}
dest = dest.replace(/href={\`#dest-\${dest.id}\`}/g, 'href="#tours"');
// we need `<Link href="#tours">` wrapping the motion.div
// Let's just do a simpler string replace.
