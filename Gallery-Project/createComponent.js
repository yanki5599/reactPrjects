import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get the current directory equivalent to __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentName = process.argv[2];
if (!componentName) {
  console.error("Please provide a component name.");
  process.exit(1);
}

// Define paths
const componentDir = path.join(__dirname, "src", "components", componentName);
const componentFile = path.join(componentDir, `${componentName}.tsx`);
const styleFile = path.join(componentDir, `${componentName}.css`);

// Check if component directory already exists
if (fs.existsSync(componentDir)) {
  console.error(`Component folder "${componentName}" already exists.`);
  process.exit(1);
}

// Create component folder
fs.mkdirSync(componentDir, { recursive: true });

// Create .tsx file with a basic template
fs.writeFileSync(
  componentFile,
  `import React from 'react';
import './${componentName}.css';

interface ${componentName}Props {}

const ${componentName}:React.FC<${componentName}Props> = ({}) => {
    return (
        <div className="${componentName}">
            <h1>${componentName} Component</h1>
        </div>
    );
};

export default ${componentName};
`
);

// Create .css file with a basic template
fs.writeFileSync(
  styleFile,
  `.${componentName} {
    /* Add your styles here */
}
`
);

console.log(`Component "${componentName}" has been created successfully.`);
