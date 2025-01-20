# Function Chain Calculator

A Next.js application that demonstrates function chaining and real-time mathematical calculations. Users can input mathematical expressions that are evaluated in a specific sequence, with the output of each function feeding into the next.

## 📸 Screenshot

![Function Chain Calculator](/public/images/screenshot.png)

## 🌟 Features

### Function Chain Visualization

- Visual representation of 5 interconnected function nodes
- Custom-built flow visualization without external libraries
- Fixed execution order: 1 → 2 → 4 → 5 → 3
- Curved connecting lines showing data flow between nodes

### Mathematical Processing

- Support for basic arithmetic operations (+, -, \*, /, ^)
- Real-time expression validation
- Dynamic calculation as expressions or input values change
- Chain-based calculation where output of one function becomes input for the next

### Interactive UI Components

- Input node for initial value (x)
- Output node showing final calculation result (y)
- Function cards with:
  - Editable expression input
  - Disabled dropdown showing next function in chain
  - Visual input/output connectors
  - Error handling for invalid expressions

## 🛠 Technical Implementation

### Built With

- **Framework**: Next.js 15.1.2
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **State Management**: React Context API

### Key Components

- `Canvas`: Main container managing the graph state and layout
- `FunctionNode`: Individual function cards with expression inputs
- `Edge`: Custom curved connection lines between nodes
- `SpecialNode`: Input/Output nodes for the chain
- `InputWithIcon`: Specialized input component with connector visualization

## 🚀 Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Run development server**

   ```bash
   npm run dev
   ```

3. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Usage

1. Enter an initial value in the "Initial value of x" input
2. Modify function expressions in any of the function cards
3. Watch as calculations automatically update through the chain
4. Final result appears in the "Final Output y" display

### Valid Expression Examples

- `x^2`
- `2x+4`
- `x/2`
- `x-2`
- `x^2+20`
