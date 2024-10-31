import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentName = process.argv[2];
if (!componentName) {
  console.error("Please provide a component name.");
  process.exit(1);
}

// Define paths relative to the current working directory
const projectRoot = process.cwd();
const componentDir = path.join(projectRoot, "src", "components", componentName);
const componentFile = path.join(componentDir, `${componentName}.tsx`);
const styleFile = path.join(componentDir, `${componentName}.css`);

if (fs.existsSync(componentDir)) {
  console.error(`Component folder "${componentName}" already exists.`);
  process.exit(1);
}

fs.mkdirSync(componentDir, { recursive: true });

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

fs.writeFileSync(
  styleFile,
  `.${componentName} {
    /* Add your styles here */
}
`
);

console.log(`Component "${componentName}" has been created successfully.`);
