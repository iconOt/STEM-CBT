// ============================================================
// STEM CBT Practice App
// ============================================================

const $ = (s, c = document) => c.querySelector(s)
const $$ = (s, c = document) => [...c.querySelectorAll(s)]

const LETTERS = ['A', 'B', 'C', 'D']
 
// ===== STATE =====
const state = {
  screen: 'login',
  studentName: '',
  class: '',
  subject: '',
  questionCount: 10,
  questions: [],
  currentIndex: 0,
  answers: {},
  timer: 0,
  timerInterval: null,
  testHistory: []
}

// ===== SUBJECT MAPPING =====
const subjectsByClass = {
  JSS1: ['Mathematics', 'Basic Science', 'Basic Technology', 'Computer Studies'],
  JSS2: ['Mathematics', 'Basic Science', 'Basic Technology', 'Computer Studies'],
  JSS3: ['Mathematics', 'Basic Science', 'Basic Technology', 'Computer Studies'],
  SSS1: ['Mathematics', 'Physics', 'Chemistry', 'Biology'],
  SSS2: ['Mathematics', 'Physics', 'Chemistry', 'Biology'],
  SSS3: ['Mathematics', 'Physics', 'Chemistry', 'Biology']
}

// ===== QUESTION BANK =====
const QB = {
  JSS1: {
    Mathematics: [
      { q: 'What is the place value of 5 in 3521?', o: ['Tens', 'Hundreds', 'Thousands', 'Units'], a: 1 },
      { q: 'What is the sum of 24 and 37?', o: ['51', '61', '71', '41'], a: 0 },
      { q: 'How many sides does a triangle have?', o: ['2', '3', '4', '5'], a: 1 },
      { q: 'What fraction of a circle is 180\u00b0?', o: ['1/4', '1/3', '1/2', '2/3'], a: 2 },
      { q: 'What is 3 \u00d7 8?', o: ['21', '24', '27', '32'], a: 1 },
      { q: 'Round 47 to the nearest ten.', o: ['40', '45', '50', '55'], a: 2 },
      { q: 'What is the LCM of 4 and 6?', o: ['10', '12', '14', '24'], a: 1 },
      { q: 'Write 0.5 as a fraction.', o: ['1/5', '1/4', '1/3', '1/2'], a: 3 },
      { q: 'What is the perimeter of a square with side 5 cm?', o: ['10 cm', '15 cm', '20 cm', '25 cm'], a: 2 },
      { q: 'What is 15 \u2212 8?', o: ['5', '6', '7', '8'], a: 2 },
      { q: 'Which is the largest: 0.3, 0.25, 0.5, 0.45?', o: ['0.3', '0.25', '0.5', '0.45'], a: 2 },
      { q: 'What is the next number: 2, 4, 6, 8, ?', o: ['9', '10', '11', '12'], a: 1 },
      { q: 'How many faces does a cube have?', o: ['4', '6', '8', '12'], a: 1 },
      { q: 'What is 100 \u00f7 5?', o: ['20', '25', '50', '5'], a: 0 },
      { q: 'What type of angle is 90\u00b0?', o: ['Acute', 'Right', 'Obtuse', 'Reflex'], a: 1 },
      { q: 'Write 3/5 as a decimal.', o: ['0.3', '0.35', '0.6', '0.5'], a: 2 },
      { q: 'How many edges does a cuboid have?', o: ['6', '8', '10', '12'], a: 3 },
      { q: 'What is 25% of 80?', o: ['15', '20', '25', '30'], a: 1 },
      { q: 'Which is the smallest prime number?', o: ['0', '1', '2', '3'], a: 2 },
      { q: 'What is 9 + 6?', o: ['13', '14', '15', '16'], a: 2 },
      { q: 'How many degrees in a right angle?', o: ['45', '60', '90', '180'], a: 2 },
      { q: 'What is 7 \u00d7 9?', o: ['56', '63', '72', '81'], a: 1 },
      { q: 'What is the product of 6 and 11?', o: ['56', '60', '66', '72'], a: 2 },
      { q: 'What does the Roman numeral X represent?', o: ['5', '10', '50', '100'], a: 1 }
    ],
    'Basic Science': [
      { q: 'Living things that can make their own food are called?', o: ['Consumers', 'Decomposers', 'Producers', 'Herbivores'], a: 2 },
      { q: 'What is the colour of a plant leaf due to?', o: ['Carotene', 'Chlorophyll', 'Xanthophyll', 'Anthocyanin'], a: 1 },
      { q: 'Which state of matter has a fixed shape?', o: ['Solid', 'Liquid', 'Gas', 'Plasma'], a: 0 },
      { q: 'What is the unit of force?', o: ['Joule', 'Newton', 'Watt', 'Pascal'], a: 1 },
      { q: 'What part of the plant conducts water?', o: ['Phloem', 'Xylem', 'Epidermis', 'Cortex'], a: 1 },
      { q: 'Which organ pumps blood around the body?', o: ['Lungs', 'Liver', 'Heart', 'Brain'], a: 2 },
      { q: 'What is the boiling point of water at sea level?', o: ['50\u00b0C', '100\u00b0C', '150\u00b0C', '200\u00b0C'], a: 1 },
      { q: 'Which group of animals has scales?', o: ['Mammals', 'Birds', 'Reptiles', 'Amphibians'], a: 2 },
      { q: 'What causes an object to float?', o: ['Gravity', 'Buoyancy', 'Friction', 'Magnetism'], a: 1 },
      { q: 'What is the process by which plants make food?', o: ['Respiration', 'Photosynthesis', 'Digestion', 'Fermentation'], a: 1 },
      { q: 'Which planet is closest to the sun?', o: ['Venus', 'Earth', 'Mercury', 'Mars'], a: 2 },
      { q: 'What gas do animals breathe out?', o: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Hydrogen'], a: 2 },
      { q: 'What is the largest organ in the human body?', o: ['Liver', 'Brain', 'Skin', 'Heart'], a: 2 },
      { q: 'Which tool is used to measure temperature?', o: ['Barometer', 'Thermometer', 'Hygrometer', 'Anemometer'], a: 1 },
      { q: 'What type of energy does a moving car have?', o: ['Potential', 'Kinetic', 'Chemical', 'Nuclear'], a: 1 },
      { q: 'What are animals that eat only plants called?', o: ['Carnivores', 'Omnivores', 'Herbivores', 'Scavengers'], a: 2 },
      { q: 'What is the chemical symbol for water?', o: ['H2O', 'CO2', 'NaCl', 'O2'], a: 0 },
      { q: 'Which sense organ detects sound?', o: ['Eye', 'Ear', 'Nose', 'Tongue'], a: 1 },
      { q: 'What do we call animals with a backbone?', o: ['Invertebrates', 'Vertebrates', 'Mammals', 'Arthropods'], a: 1 },
      { q: 'What is the change from liquid to gas called?', o: ['Melting', 'Freezing', 'Condensation', 'Evaporation'], a: 3 }
    ],
    'Basic Technology': [
      { q: 'What is a simple machine used to cut?', o: ['Lever', 'Pulley', 'Wedge', 'Screw'], a: 2 },
      { q: 'What type of motion does a door hinge allow?', o: ['Linear', 'Rotary', 'Oscillating', 'Reciprocating'], a: 2 },
      { q: 'Which material is a good conductor of electricity?', o: ['Plastic', 'Copper', 'Wood', 'Rubber'], a: 1 },
      { q: 'What is CAD an abbreviation for?', o: ['Computer Aided Design', 'Computer Automated Drawing', 'Central Application Device', 'Code And Design'], a: 0 },
      { q: 'What is the unit of electric current?', o: ['Volt', 'Watt', 'Ampere', 'Ohm'], a: 2 },
      { q: 'Which wood joint is strongest?', o: ['Butt joint', 'Dovetail joint', 'Lap joint', 'Edge joint'], a: 1 },
      { q: 'What drawing instrument is used to draw circles?', o: ['Ruler', 'Protractor', 'Compass', 'Set square'], a: 2 },
      { q: 'What does a fuse do in a circuit?', o: ['Stores power', 'Prevents overloading', 'Amplifies current', 'Measures voltage'], a: 1 },
      { q: 'What type of saw is used for cutting curves in wood?', o: ['Handsaw', 'Coping saw', 'Hacksaw', 'Tenon saw'], a: 1 },
      { q: 'What is the function of a battery?', o: ['Generate heat', 'Store chemical energy', 'Measure current', 'Resist flow'], a: 1 },
      { q: 'Which plane is used for smoothing wood?', o: ['Block plane', 'Jack plane', 'Smoothing plane', 'Rebate plane'], a: 2 },
      { q: 'What is the SI unit of length?', o: ['Centimeter', 'Meter', 'Kilometer', 'Millimeter'], a: 1 },
      { q: 'What type of line shows hidden edges in a drawing?', o: ['Continuous', 'Dashed', 'Chain', 'Wavy'], a: 1 },
      { q: 'What is a lever?', o: ['A pulley', 'A rigid bar pivoted at a point', 'An inclined plane', 'A screw'], a: 1 },
      { q: 'What material is used for electrical insulation?', o: ['Iron', 'Copper', 'Rubber', 'Aluminum'], a: 2 },
      { q: 'What is the main purpose of lubrication?', o: ['Cool down', 'Reduce friction', 'Increase speed', 'Add color'], a: 1 },
      { q: 'What is the first angle projection symbol?', o: ['Circle', 'Cone', 'Truncated cone', 'Two concentric circles'], a: 0 },
      { q: 'Which instrument measures voltage?', o: ['Ammeter', 'Voltmeter', 'Ohmmeter', 'Galvanometer'], a: 1 }
    ],
    'Computer Studies': [
      { q: 'What does CPU stand for?', o: ['Central Processing Unit', 'Computer Personal Unit', 'Central Program Utility', 'Core Processing Unit'], a: 0 },
      { q: 'Which device is used to input text?', o: ['Monitor', 'Keyboard', 'Printer', 'Speaker'], a: 1 },
      { q: 'What is the brain of the computer?', o: ['RAM', 'CPU', 'Hard Drive', 'Motherboard'], a: 1 },
      { q: 'What does the mouse control?', o: ['Volume', 'Cursor', 'Brightness', 'Printer'], a: 1 },
      { q: 'Which of these is an output device?', o: ['Keyboard', 'Mouse', 'Monitor', 'Scanner'], a: 2 },
      { q: 'What is software?', o: ['Physical computer parts', 'Programs and data', 'Computer screen', 'Keyboard'], a: 1 },
      { q: 'What does RAM stand for?', o: ['Read Access Memory', 'Random Access Memory', 'Read And Manage', 'Run Application Memory'], a: 1 },
      { q: 'Which key deletes text to the left?', o: ['Delete', 'Backspace', 'Shift', 'Ctrl'], a: 1 },
      { q: 'What is a computer virus?', o: ['A hardware fault', 'A harmful program', 'A type of disk', 'A power surge'], a: 1 },
      { q: 'What is the full meaning of ICT?', o: ['Information and Communication Technology', 'Integrated Computer Technology', 'Internet Connection Tool', 'Internal Computing Terminal'], a: 0 },
      { q: 'Which storage device holds the most data?', o: ['Floppy disk', 'CD-ROM', 'Hard disk', 'Flash drive'], a: 2 },
      { q: 'What does an operating system do?', o: ['Browse the internet', 'Manage computer resources', 'Type documents', 'Play games'], a: 1 },
      { q: 'Which is an example of an operating system?', o: ['Microsoft Word', 'Windows 10', 'Chrome', 'Excel'], a: 1 },
      { q: 'What does WWW stand for?', o: ['World Wide Web', 'World Web Window', 'Wide World Web', 'Web World Wide'], a: 0 },
      { q: 'Which device converts data to a form a computer can understand?', o: ['Output device', 'Input device', 'Storage device', 'Processing device'], a: 1 },
      { q: 'What is the function of a printer?', o: ['Scan images', 'Print on paper', 'Display video', 'Store data'], a: 1 },
      { q: 'What is a byte made up of?', o: ['4 bits', '6 bits', '8 bits', '10 bits'], a: 2 },
      { q: 'Which of these is a search engine?', o: ['Microsoft Word', 'Google Chrome', 'Google', 'Windows'], a: 2 },
      { q: 'What is the shortcut for Copy (Ctrl + C)?', o: ['Cut', 'Copy', 'Paste', 'Delete'], a: 1 },
      { q: 'What type of device is a touchscreen?', o: ['Input only', 'Output only', 'Both input and output', 'Neither'], a: 2 }
    ]
  },

  JSS2: {
    Mathematics: [
      { q: 'Simplify: 2x + 3x.', o: ['5x', '6x', '5x\u00b2', '6x\u00b2'], a: 0 },
      { q: 'What is the square root of 81?', o: ['7', '8', '9', '10'], a: 2 },
      { q: 'What is the area of a rectangle 6 cm by 4 cm?', o: ['20 cm\u00b2', '24 cm\u00b2', '28 cm\u00b2', '10 cm\u00b2'], a: 1 },
      { q: 'If a = 3 and b = 4, what is a\u00b2 + b\u00b2?', o: ['12', '25', '7', '49'], a: 1 },
      { q: 'What is 40% of 200?', o: ['60', '80', '100', '120'], a: 1 },
      { q: 'What is the mean of 4, 7, 10, 13?', o: ['7', '7.5', '8.5', '8'], a: 2 },
      { q: 'What is 2\u00b3?', o: ['4', '6', '8', '10'], a: 2 },
      { q: 'Convert 1011\u2082 to decimal.', o: ['9', '10', '11', '12'], a: 2 },
      { q: 'What is the value of \u03c0 to two decimal places?', o: ['3.14', '3.15', '3.12', '3.41'], a: 0 },
      { q: 'A triangle has sides 3 cm, 4 cm, 5 cm. What type is it?', o: ['Equilateral', 'Isosceles', 'Right-angled', 'Scalene'], a: 2 },
      { q: 'What is \u221a(25 \u00d7 4)?', o: ['10', '20', '14', '100'], a: 0 },
      { q: 'Simplify (2\u00b3 \u00d7 2\u00b2).', o: ['2\u2075', '2\u2076', '4\u2075', '2\u00b9'], a: 0 },
      { q: 'How many sides does a hexagon have?', o: ['5', '6', '7', '8'], a: 1 },
      { q: 'What is 1/4 + 1/2?', o: ['1/6', '2/6', '3/4', '2/4'], a: 2 },
      { q: 'If a:b = 2:3 and b:c = 6:5, find a:c.', o: ['4:5', '2:5', '6:5', '4:15'], a: 0 },
      { q: 'What is the volume of a cube of side 3 cm?', o: ['9 cm\u00b3', '18 cm\u00b3', '27 cm\u00b3', '36 cm\u00b3'], a: 2 },
      { q: 'What is 60 \u00f7 0.2?', o: ['12', '30', '120', '300'], a: 3 },
      { q: 'How many days are there in 5 weeks?', o: ['30', '35', '40', '45'], a: 1 },
      { q: 'What is the probability of getting a head when tossing a coin?', o: ['0', '1/4', '1/2', '1'], a: 2 },
      { q: 'What is the difference between 150 and 87?', o: ['63', '73', '53', '43'], a: 0 }
    ],
    'Basic Science': [
      { q: 'What is the pH of pure water?', o: ['5', '6', '7', '8'], a: 2 },
      { q: 'What type of blood vessel carries blood away from the heart?', o: ['Vein', 'Artery', 'Capillary', 'Venule'], a: 1 },
      { q: 'What is a habitat?', o: ["An animal's food", "An organism's natural home", 'A type of plant', 'A water body'], a: 1 },
      { q: 'What is rusting caused by?', o: ['Oxygen and water', 'Heat and light', 'Nitrogen and air', 'Carbon dioxide'], a: 0 },
      { q: 'Which nutrient gives the most energy?', o: ['Protein', 'Vitamin', 'Carbohydrate', 'Mineral'], a: 2 },
      { q: 'What is the SI unit of mass?', o: ['Gram', 'Newton', 'Kilogram', 'Pound'], a: 2 },
      { q: 'What force opposes motion?', o: ['Gravity', 'Friction', 'Tension', 'Normal force'], a: 1 },
      { q: 'What is the female reproductive cell called?', o: ['Sperm', 'Egg (Ovum)', 'Zygote', 'Embryo'], a: 1 },
      { q: 'What is the function of the nervous system?', o: ['Digest food', 'Pump blood', 'Coordinate body activities', 'Filter waste'], a: 2 },
      { q: 'Acids turn litmus paper what colour?', o: ['Blue', 'Red', 'Green', 'Yellow'], a: 1 },
      { q: 'What is the chemical symbol for sodium?', o: ['So', 'Sd', 'Na', 'Sm'], a: 2 },
      { q: 'What is the energy of a moving object called?', o: ['Chemical energy', 'Potential energy', 'Kinetic energy', 'Nuclear energy'], a: 2 },
      { q: 'What does a barometer measure?', o: ['Temperature', 'Humidity', 'Pressure', 'Wind speed'], a: 2 },
      { q: 'How many bones are in the adult human body?', o: ['106', '206', '306', '406'], a: 1 },
      { q: 'Which process separates liquid from a mixture by boiling?', o: ['Filtration', 'Decantation', 'Distillation', 'Evaporation'], a: 2 },
      { q: 'What is a group of cells working together called?', o: ['Organ', 'Tissue', 'System', 'Organism'], a: 1 },
      { q: 'What type of rock is formed from cooled magma?', o: ['Sedimentary', 'Metamorphic', 'Igneous', 'Fossil'], a: 2 },
      { q: 'What is the main gas in the atmosphere?', o: ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Argon'], a: 2 },
      { q: 'What is the bending of light called?', o: ['Reflection', 'Refraction', 'Diffraction', 'Absorption'], a: 1 },
      { q: 'What type of teeth are used for grinding food?', o: ['Incisors', 'Canines', 'Premolars and Molars', 'All of them'], a: 2 }
    ],
    'Basic Technology': [
      { q: 'What is the function of a clutch in a car?', o: ['Stop the car', 'Engage/disengage power', 'Steer the car', 'Amplify speed'], a: 1 },
      { q: 'What type of motion does a pendulum have?', o: ['Linear', 'Rotary', 'Oscillatory', 'Reciprocating'], a: 2 },
      { q: 'What does the symbol \u03a9 represent?', o: ['Voltage', 'Current', 'Resistance', 'Power'], a: 2 },
      { q: 'What is a first-class lever?', o: ['Lever with fulcrum at end', 'Lever with fulcrum in middle', 'Lever with load in middle', 'Lever with effort in middle'], a: 1 },
      { q: 'What is the strongest shape in engineering?', o: ['Square', 'Rectangle', 'Triangle', 'Circle'], a: 2 },
      { q: 'What instruments are used for drawing parallel lines?', o: ['Compass and Divider', 'T-square and Set squares', 'Protractor and Scale', 'Pencil and Eraser'], a: 1 },
      { q: 'What is an alloy?', o: ['A pure metal', 'A mixture of two or more metals', 'A type of rock', 'A type of plastic'], a: 1 },
      { q: 'What device controls the flow of electric current?', o: ['Battery', 'Switch', 'Bulb', 'Resistor'], a: 1 },
      { q: 'What is a file used for in metalwork?', o: ['Cutting', 'Smoothing', 'Measuring', 'Drilling'], a: 1 },
      { q: 'What does an ammeter measure?', o: ['Voltage', 'Resistance', 'Current', 'Power'], a: 2 },
      { q: 'What is a gear?', o: ['A wheel with teeth', 'A type of lever', 'An inclined plane', 'A pulley system'], a: 0 },
      { q: 'What is the function of a shock absorber?', o: ['Increase speed', 'Reduce vibrations', 'Steer the vehicle', 'Increase friction'], a: 1 },
      { q: 'What is the third-angle projection symbol?', o: ['A circle', 'A cone', 'Two concentric circles', 'A rectangle'], a: 2 },
      { q: 'What type of drawing shows an object in 3D?', o: ['Isometric', 'Orthographic', 'Plan', 'Sectional'], a: 0 },
      { q: 'What is a thermostat used for?', o: ['Measure pressure', 'Regulate temperature', 'Control speed', 'Measure current'], a: 1 },
      { q: 'What is the advantage of a belt drive over a chain drive?', o: ['Stronger', 'Quieter', 'Faster', 'Cheaper'], a: 1 },
      { q: 'What does an electric motor convert electrical energy to?', o: ['Heat energy', 'Light energy', 'Mechanical energy', 'Sound energy'], a: 2 },
      { q: 'What is a cantilever?', o: ['A beam supported at one end', 'A beam in the middle', 'A circular arch', 'A triangular frame'], a: 0 }
    ],
    'Computer Studies': [
      { q: 'What does LAN stand for?', o: ['Large Area Network', 'Local Area Network', 'Long Access Network', 'Light Amplitude Network'], a: 1 },
      { q: 'What is a database?', o: ['A type of printer', 'An organized collection of data', 'A programming language', 'A web browser'], a: 1 },
      { q: 'What is the function of the control unit in a CPU?', o: ['Perform calculations', 'Control and coordinate operations', 'Store data', 'Display results'], a: 1 },
      { q: 'Which key combination is used for cutting text?', o: ['Ctrl + C', 'Ctrl + X', 'Ctrl + V', 'Ctrl + Z'], a: 1 },
      { q: 'What is a computer network?', o: ['A group of connected computers', 'A single computer', 'A type of software', 'A computer screen'], a: 0 },
      { q: 'What does URL stand for?', o: ['Uniform Resource Locator', 'Universal Resource Link', 'United Resource Locator', 'Uniform Reference Link'], a: 0 },
      { q: 'What is the function of an anti-virus?', o: ['Speed up computer', 'Detect and remove viruses', 'Browse the internet', 'Edit documents'], a: 1 },
      { q: 'Which of these is a volatile memory?', o: ['ROM', 'Hard disk', 'RAM', 'Flash drive'], a: 2 },
      { q: 'What is the decimal equivalent of binary 1100?', o: ['8', '10', '12', '14'], a: 2 },
      { q: 'What is a spreadsheet used for?', o: ['Creating presentations', 'Organizing and calculating data', 'Browsing websites', 'Editing images'], a: 1 },
      { q: 'What does the @ symbol mean in email addresses?', o: ['At', 'And', 'On', 'To'], a: 0 },
      { q: 'What is an algorithm?', o: ['A computer program', 'A step-by-step procedure', 'A type of data', 'A programming language'], a: 1 },
      { q: 'What is the full meaning of HTML?', o: ['HyperText Markup Language', 'High Tech Modern Language', 'Hyper Transfer Markup Language', 'Home Tool Markup Language'], a: 0 },
      { q: 'Which device connects a computer to the internet?', o: ['Printer', 'Modem', 'Scanner', 'Speaker'], a: 1 },
      { q: 'What is the function of a firewall?', o: ['Cool the computer', 'Block unauthorized access', 'Increase internet speed', 'Store files'], a: 1 },
      { q: 'What is a pixel?', o: ['A type of printer', 'The smallest unit of a digital image', 'A computer language', 'A storage device'], a: 1 },
      { q: 'What does GUI stand for?', o: ['Graphical User Interface', 'General User Input', 'Global Utility Index', 'Graphical Unified Interface'], a: 0 },
      { q: 'What is MS Excel primarily used for?', o: ['Word processing', 'Data analysis and spreadsheets', 'Web browsing', 'Email communication'], a: 1 },
      { q: 'What is the function of the Enter key?', o: ['Delete text', 'Move to the next line', 'Change font', 'Close program'], a: 1 },
      { q: 'What type of network covers a large geographical area?', o: ['LAN', 'MAN', 'WAN', 'PAN'], a: 2 }
    ]
  },

  JSS3: {
    Mathematics: [
      { q: 'Solve: 2x + 5 = 13. Find x.', o: ['3', '4', '5', '6'], a: 1 },
      { q: 'What is the value of \u221a144?', o: ['10', '11', '12', '13'], a: 2 },
      { q: 'A man earns \u20a650,000 and saves 30%. How much does he save?', o: ['\u20a610,000', '\u20a615,000', '\u20a618,000', '\u20a620,000'], a: 1 },
      { q: 'What is the sum of interior angles of a triangle?', o: ['90\u00b0', '180\u00b0', '270\u00b0', '360\u00b0'], a: 1 },
      { q: 'Simplify (3x\u00b2y) \u00f7 (xy).', o: ['3x', '3y', '3xy', '3x\u00b2'], a: 0 },
      { q: 'What is 15% of 400?', o: ['40', '50', '60', '70'], a: 2 },
      { q: 'A car travels 180 km in 3 hours. What is its speed?', o: ['50 km/h', '60 km/h', '70 km/h', '90 km/h'], a: 1 },
      { q: 'What is the formula for the area of a circle?', o: ['2\u03c0r', '\u03c0r\u00b2', '\u03c0d', '\u03c0r\u00b3'], a: 1 },
      { q: 'What is 0.25 as a fraction?', o: ['1/5', '1/4', '1/3', '2/5'], a: 1 },
      { q: 'If 2x = 16, what is x?', o: ['2', '4', '6', '8'], a: 1 },
      { q: 'What is the total surface area of a cube of side 2 cm?', o: ['12 cm\u00b2', '18 cm\u00b2', '24 cm\u00b2', '30 cm\u00b2'], a: 2 },
      { q: 'What is the median of 3, 7, 9, 12, 15?', o: ['7', '8', '9', '10'], a: 2 },
      { q: 'Convert 0.75 to a percentage.', o: ['7.5%', '75%', '0.75%', '750%'], a: 1 },
      { q: 'What is the cube root of 64?', o: ['2', '4', '6', '8'], a: 1 },
      { q: 'If 5! (factorial) is 120, what is 6!?', o: ['600', '720', '800', '840'], a: 1 },
      { q: 'What is the bearing of East from North?', o: ['45\u00b0', '90\u00b0', '135\u00b0', '180\u00b0'], a: 1 },
      { q: 'Simplify: 4(2x - 3) - 2(3x + 1).', o: ['2x - 10', '2x - 14', '2x + 10', '2x - 12'], a: 1 },
      { q: 'What is the ratio 40:60 in simplest form?', o: ['1:3', '2:3', '3:2', '4:6'], a: 1 },
      { q: 'How many degrees in a straight line?', o: ['90\u00b0', '180\u00b0', '270\u00b0', '360\u00b0'], a: 1 },
      { q: 'If y = 2x + 3, what is y when x = 4?', o: ['8', '9', '10', '11'], a: 3 }
    ],
    'Basic Science': [
      { q: 'What is electricity?', o: ['Flow of neutrons', 'Flow of electrons', 'Flow of atoms', 'Flow of protons'], a: 1 },
      { q: 'What is the unit of electric current?', o: ['Volt', 'Ohm', 'Ampere', 'Watt'], a: 2 },
      { q: 'What are the products of photosynthesis?', o: ['Water and oxygen', 'Glucose and oxygen', 'Glucose and carbon dioxide', 'Water and glucose'], a: 1 },
      { q: 'What type of bond involves sharing electrons?', o: ['Ionic bond', 'Covalent bond', 'Metallic bond', 'Hydrogen bond'], a: 1 },
      { q: 'What is the function of red blood cells?', o: ['Fight infection', 'Carry oxygen', 'Clot blood', 'Produce hormones'], a: 1 },
      { q: 'What does a hygrometer measure?', o: ['Pressure', 'Temperature', 'Humidity', 'Wind speed'], a: 2 },
      { q: 'What is a chemical change?', o: ['Change of state', 'Formation of new substances', 'Change in shape', 'Change in size'], a: 1 },
      { q: 'What type of mirror is used in car side mirrors?', o: ['Plane', 'Concave', 'Convex', 'Spherical'], a: 2 },
      { q: 'What is the atomic number of carbon?', o: ['4', '6', '8', '12'], a: 1 },
      { q: 'What is the function of the skeleton?', o: ['Digestion', 'Support and protection', 'Respiration', 'Circulation'], a: 1 },
      { q: 'What is the transfer of heat through fluids called?', o: ['Conduction', 'Convection', 'Radiation', 'Evaporation'], a: 1 },
      { q: 'What does DNA stand for?', o: ['Deoxyribonucleic Acid', 'Dynamic Nuclear Acid', 'Double Nucleic Acid', 'Deoxyribose Nuclear Acid'], a: 0 },
      { q: 'What is the instrument that measures earthquakes?', o: ['Barometer', 'Thermometer', 'Seismograph', 'Hygrometer'], a: 2 },
      { q: 'What is the universal solvent?', o: ['Alcohol', 'Oil', 'Water', 'Acetone'], a: 2 },
      { q: 'What is the functional unit of the kidney?', o: ['Neuron', 'Nephron', 'Alveolus', 'Villus'], a: 1 },
      { q: 'What is the effect of an acid on blue litmus?', o: ['No change', 'Turns red', 'Turns green', 'Turns white'], a: 1 },
      { q: 'What is the speed of light in vacuum?', o: ['3 \u00d7 10\u2076 m/s', '3 \u00d7 10\u2078 m/s', '3 \u00d7 10\u00b9\u2070 m/s', '3 \u00d7 10\u00b9\u00b2 m/s'], a: 1 },
      { q: 'What type of reproduction involves one parent?', o: ['Sexual', 'Asexual', 'Fertilization', 'Pollination'], a: 1 },
      { q: 'What is the organ that produces bile?', o: ['Pancreas', 'Stomach', 'Liver', 'Gall bladder'], a: 2 },
      { q: 'What are materials that do not allow heat to pass through?', o: ['Conductors', 'Insulators', 'Metals', 'Semi-conductors'], a: 1 }
    ],
    'Basic Technology': [
      { q: 'What is the function of a crankshaft in an engine?', o: ['Open valves', 'Convert linear to rotary motion', 'Cool the engine', 'Filter oil'], a: 1 },
      { q: 'What is the mechanical advantage of a single fixed pulley?', o: ['0', '1', '2', 'Depends on load'], a: 1 },
      { q: 'What is the main purpose of a fusible plug in a boiler?', o: ['Increase pressure', 'Safety device to prevent explosion', 'Control temperature', 'Measure pressure'], a: 1 },
      { q: 'What is a cam used for?', o: ['Measure distance', 'Convert rotary to linear motion', 'Transmit power', 'Store energy'], a: 1 },
      { q: 'What does the abbreviation DC stand for?', o: ['Direct Current', 'Digital Circuit', 'Dual Core', 'Direct Connection'], a: 0 },
      { q: 'What type of material is cast iron?', o: ['Non-metal', 'Ferrous metal', 'Non-ferrous metal', 'Alloy'], a: 1 },
      { q: 'What is the function of a transistor?', o: ['Store charge', 'Amplify or switch signals', 'Generate light', 'Measure resistance'], a: 1 },
      { q: 'What is orthographic projection?', o: ['3D drawing', '2D views of an object from different sides', 'Perspective drawing', 'Sectional view'], a: 1 },
      { q: 'What is a resistor used for?', o: ['Store energy', 'Limit current flow', 'Amplify voltage', 'Generate heat'], a: 1 },
      { q: 'What is the hardness of a material tested with?', o: ['Tensile test', 'Izod test', 'Brinell test', 'Fatigue test'], a: 2 },
      { q: 'What is the function of a governor in an engine?', o: ['Increase speed', 'Regulate speed', 'Cool the engine', 'Lubricate parts'], a: 1 },
      { q: 'What is a soldering iron used for?', o: ['Welding metal', 'Joining components with solder', 'Cutting metal', 'Measuring temperature'], a: 1 },
      { q: 'What type of circuit allows current to flow?', o: ['Open circuit', 'Closed circuit', 'Short circuit', 'Series circuit'], a: 1 },
      { q: 'What is the primary function of a dynamo?', o: ['Convert mechanical to electrical energy', 'Convert electrical to mechanical', 'Store electricity', 'Measure current'], a: 0 },
      { q: 'What is the difference between AC and DC?', o: ['AC is stronger', 'DC changes direction', 'AC changes direction', 'No difference'], a: 2 },
      { q: 'What does CNC stand for?', o: ['Computer Numerical Control', 'Central Network Computer', 'Computerized Network Circuit', 'Controlled Numerical Computer'], a: 0 },
      { q: 'What is the function of a spring?', o: ['Transmit power', 'Absorb shock and store energy', 'Generate heat', 'Measure force'], a: 1 },
      { q: 'What is the main component of steel?', o: ['Iron and carbon', 'Iron and aluminum', 'Copper and tin', 'Iron and nickel'], a: 0 }
    ],
    'Computer Studies': [
      { q: 'What does WWW stand for?', o: ['World Wide Web', 'World Web Window', 'Wide World Web', 'Web Wide World'], a: 0 },
      { q: 'What is a computer program?', o: ['A set of instructions for a computer', 'A computer hardware', 'A type of cable', 'A storage device'], a: 0 },
      { q: 'What is the binary equivalent of decimal 10?', o: ['1000', '1010', '1100', '1001'], a: 1 },
      { q: 'What is the function of an operating system?', o: ['Type documents', 'Manage hardware and software resources', 'Browse the internet', 'Design graphics'], a: 1 },
      { q: 'What is the name for unwanted emails?', o: ['Drafts', 'Spam', 'Inbox', 'Trash'], a: 1 },
      { q: 'What does USB stand for?', o: ['Universal Serial Bus', 'United Serial Board', 'Universal System Bus', 'Uniform Serial Bus'], a: 0 },
      { q: 'What is the function of a compiler?', o: ['Run programs', 'Convert source code to machine code', 'Edit code', 'Store data'], a: 1 },
      { q: 'What type of website uses .gov?', o: ['Commercial', 'Government', 'Educational', 'Organization'], a: 1 },
      { q: 'What is the smallest unit of data in a computer?', o: ['Byte', 'Bit', 'Nibble', 'Word'], a: 1 },
      { q: 'What is a spreadsheet cell?', o: ['A column', 'A row', 'The intersection of a row and column', 'A function'], a: 2 },
      { q: 'What does ISP stand for?', o: ['Internet Service Provider', 'Integrated System Protocol', 'Internal Security Program', 'Internet Security Protocol'], a: 0 },
      { q: 'What is the function of a surge protector?', o: ['Prevent power surges', 'Increase voltage', 'Store electricity', 'Measure current'], a: 0 },
      { q: 'What is the term for a program that replicates itself?', o: ['Antivirus', 'Virus', 'Firewall', 'Compiler'], a: 1 },
      { q: 'What is cloud computing?', o: ['Computing using weather data', 'Storing and accessing data over the internet', 'Using multiple monitors', 'A type of hardware'], a: 1 },
      { q: 'What is the purpose of a router?', o: ['Print documents', 'Direct network traffic', 'Scan images', 'Store files'], a: 1 },
      { q: 'What is the decimal equivalent of binary 1111?', o: ['12', '13', '14', '15'], a: 3 },
      { q: 'What does PDF stand for?', o: ['Portable Document Format', 'Personal Data File', 'Printable Document Format', 'Public Document Format'], a: 0 },
      { q: 'What is the function of the Shift key in typing?', o: ['Delete letters', 'Type capital letters', 'Add space', 'Move cursor'], a: 1 },
      { q: 'What is a modem used for?', o: ['Modulate and demodulate signals', 'Print documents', 'Scan images', 'Store data'], a: 0 },
      { q: 'What type of memory retains data when power is off?', o: ['RAM', 'Cache', 'ROM', 'Register'], a: 2 }
    ]
  },

  SSS1: {
    Mathematics: [
      { q: 'If U = {1,2,3,4,5} and A = {1,3,5}, what is A\u2019?', o: ['{2,4}', '{2,3,4}', '{1,2,3}', '{4,5}'], a: 0 },
      { q: 'Simplify: \u221a50.', o: ['5\u221a2', '10\u221a5', '5\u221a10', '2\u221a5'], a: 0 },
      { q: 'Solve for x: x\u00b2 - 9 = 0.', o: ['\u00b12', '\u00b13', '\u00b14', '\u00b16'], a: 1 },
      { q: 'What is log\u2082(8)?', o: ['2', '3', '4', '5'], a: 1 },
      { q: 'What is the nth term of 3, 7, 11, 15?', o: ['3n + 1', '4n - 1', '2n + 1', '4n + 1'], a: 1 },
      { q: 'What is the value of sin 30\u00b0?', o: ['1', '1/2', '\u221a3/2', '0'], a: 1 },
      { q: 'The midpoint of (2, 4) and (6, 8) is?', o: ['(4, 6)', '(3, 5)', '(5, 7)', '(4, 5)'], a: 0 },
      { q: 'What is the determinant of [[2,3],[1,4]]?', o: ['5', '10', '6', '8'], a: 0 },
      { q: 'What is the sum of the first 10 natural numbers?', o: ['45', '50', '55', '60'], a: 2 },
      { q: 'What is the gradient of line y = 3x + 2?', o: ['-3', '2', '3', '6'], a: 2 },
      { q: 'Simplify (x+2)(x-3).', o: ['x\u00b2 - x - 6', 'x\u00b2 + x - 6', 'x\u00b2 - 5x - 6', 'x\u00b2 - x + 6'], a: 0 },
      { q: 'What is the mode of 2, 3, 3, 5, 7, 7, 7?', o: ['2', '3', '5', '7'], a: 3 },
      { q: 'Solve 2(x - 3) = 8.', o: ['x = 5', 'x = 6', 'x = 7', 'x = 8'], a: 2 },
      { q: 'What is the area of a triangle with base 10 and height 6?', o: ['16', '30', '60', '20'], a: 1 },
      { q: 'What is cos 0\u00b0?', o: ['0', '1/2', '1', '\u221a3/2'], a: 2 },
      { q: 'What is the range of {12, 8, 15, 10, 20}?', o: ['8', '10', '12', '15'], a: 2 },
      { q: 'What is the sum of the angles in a quadrilateral?', o: ['180\u00b0', '270\u00b0', '360\u00b0', '450\u00b0'], a: 2 },
      { q: 'If P = {a,b,c}, how many subsets does P have?', o: ['3', '6', '8', '9'], a: 2 },
      { q: 'What is 6.02 \u00d7 10\u00b2\u00b3 in standard form?', o: ['0.602 \u00d7 10\u00b2\u2074', '6.02 \u00d7 10\u00b2\u00b3', '60.2 \u00d7 10\u00b2\u00b2', '0.0602 \u00d7 10\u00b2\u2075'], a: 1 },
      { q: 'What is the square root of 169?', o: ['11', '12', '13', '14'], a: 2 }
    ],
    Physics: [
      { q: 'What is the SI unit of force?', o: ['Joule', 'Newton', 'Pascal', 'Watt'], a: 1 },
      { q: 'A car accelerates from rest to 20 m/s in 5 s. What is its acceleration?', o: ['2 m/s\u00b2', '4 m/s\u00b2', '5 m/s\u00b2', '10 m/s\u00b2'], a: 1 },
      { q: 'What is the energy of a moving object?', o: ['Potential energy', 'Kinetic energy', 'Chemical energy', 'Nuclear energy'], a: 1 },
      { q: 'What is the principle of floatation?', o: ['Weight = upthrust', 'Mass = volume', 'Density = 1', 'Pressure = force/area'], a: 0 },
      { q: 'What is the speed of sound in air approximately?', o: ['340 m/s', '300 m/s', '400 m/s', '500 m/s'], a: 0 },
      { q: 'What type of wave is light?', o: ['Longitudinal', 'Transverse', 'Mechanical', 'Surface'], a: 1 },
      { q: 'What is Ohm\u2019s Law?', o: ['V = IR', 'F = ma', 'E = mc\u00b2', 'P = IV'], a: 0 },
      { q: 'What is the unit of power?', o: ['Joule', 'Newton', 'Watt', 'Coulomb'], a: 2 },
      { q: 'What is a scalar quantity?', o: ['Has magnitude and direction', 'Has magnitude only', 'Has direction only', 'Has neither'], a: 1 },
      { q: 'What is the acceleration due to gravity near Earth?', o: ['8.8 m/s\u00b2', '9.8 m/s\u00b2', '10.8 m/s\u00b2', '7.8 m/s\u00b2'], a: 1 },
      { q: 'What is the refractive index of air?', o: ['0', '1', '1.5', '2'], a: 1 },
      { q: 'What is the law of conservation of energy?', o: ['Energy is created', 'Energy is destroyed', 'Energy cannot be created or destroyed', 'Energy transforms uniquely'], a: 2 },
      { q: 'What is the unit of temperature in SI?', o: ['Celsius', 'Fahrenheit', 'Kelvin', 'Rankine'], a: 2 },
      { q: 'What is the frequency of a wave with period 0.02 s?', o: ['10 Hz', '20 Hz', '50 Hz', '100 Hz'], a: 2 },
      { q: 'What does a step-up transformer do?', o: ['Decreases voltage', 'Increases voltage', 'Increases current', 'Changes frequency'], a: 1 },
      { q: 'What is the image formed by a plane mirror?', o: ['Real and inverted', 'Virtual, upright, same size', 'Real, upright, same size', 'Virtual and inverted'], a: 1 },
      { q: 'What is the unit of charge?', o: ['Ampere', 'Volt', 'Coulomb', 'Ohm'], a: 2 },
      { q: 'What type of lens converges light?', o: ['Concave', 'Convex', 'Diverging', 'Plano-concave'], a: 1 },
      { q: 'What is Hooke\u2019s Law about?', o: ['Extension is proportional to force', 'Force equals mass times acceleration', 'Energy is conserved', 'Momentum is conserved'], a: 0 },
      { q: 'What is the boiling point of water in Kelvin?', o: ['100 K', '273 K', '373 K', '473 K'], a: 2 }
    ],
    Chemistry: [
      { q: 'What is the atomic number of oxygen?', o: ['6', '8', '10', '16'], a: 1 },
      { q: 'What is the chemical formula of water?', o: ['H2O', 'CO2', 'NaCl', 'CH4'], a: 0 },
      { q: 'What type of bond is present in NaCl?', o: ['Covalent', 'Ionic', 'Metallic', 'Hydrogen'], a: 1 },
      { q: 'What is the pH of a strong acid?', o: ['1 - 3', '4 - 6', '7', '8 - 14'], a: 0 },
      { q: 'What is a catalyst?', o: ['Slows down reaction', 'Speeds up reaction without being consumed', 'Is consumed in reaction', 'Increases temperature'], a: 1 },
      { q: 'What is the formula of sulfuric acid?', o: ['HCl', 'HNO3', 'H2SO4', 'H2CO3'], a: 2 },
      { q: 'What is a mole?', o: ['6.022 \u00d7 10\u00b2\u00b3 particles', '1 gram of substance', '1 liter of gas', '1 atom of carbon'], a: 0 },
      { q: 'What is the product of a neutralization reaction?', o: ['Acid and base', 'Salt and water', 'Base and water', 'Salt and acid'], a: 1 },
      { q: 'What is the electron configuration of carbon (6 electrons)?', o: ['1s\u00b2 2s\u00b2 2p\u00b9', '1s\u00b2 2s\u00b2 2p\u00b2', '1s\u00b2 2s\u00b9 2p\u00b3', '1s\u00b9 2s\u00b2 2p\u00b3'], a: 1 },
      { q: 'What is the periodic table arranged by?', o: ['Mass number', 'Atomic number', 'Alphabetical order', 'Density'], a: 1 },
      { q: 'What is an exothermic reaction?', o: ['Absorbs heat', 'Releases heat', 'Requires light', 'Produces gas'], a: 1 },
      { q: 'What is the formula for calculating molarity?', o: ['Moles/Liters', 'Liters/Moles', 'Moles \u00d7 Liters', 'Moles + Liters'], a: 0 },
      { q: 'Which of these is a halogen?', o: ['Sodium', 'Chlorine', 'Calcium', 'Iron'], a: 1 },
      { q: 'What is the law of conservation of mass?', o: ['Mass is created in reactions', 'Mass is neither created nor destroyed', 'Mass is always lost', 'Mass is converted to energy'], a: 1 },
      { q: 'What is the oxidation number of oxygen in H2O?', o: ['-1', '-2', '+2', '0'], a: 1 },
      { q: 'What is the chemical symbol for potassium?', o: ['Po', 'Pt', 'K', 'P'], a: 2 },
      { q: 'What is valency?', o: ['Atomic mass', 'Combining power of an element', 'Number of neutrons', 'Density'], a: 1 },
      { q: 'What is the formula of limestone?', o: ['CaO', 'Ca(OH)2', 'CaCO3', 'CaCl2'], a: 2 },
      { q: 'What is the number of neutrons in carbon-12?', o: ['4', '6', '8', '12'], a: 1 },
      { q: 'What product is formed when an acid reacts with a metal?', o: ['Salt and water', 'Salt and hydrogen gas', 'Salt only', 'Water and carbon dioxide'], a: 1 }
    ],
    Biology: [
      { q: 'What is the basic unit of life?', o: ['Tissue', 'Organ', 'Cell', 'Molecule'], a: 2, img: 'Animal+Cell+Diagram' },
      { q: 'What organelle is known as the powerhouse of the cell?', o: ['Nucleus', 'Ribosome', 'Mitochondria', 'Golgi body'], a: 2, img: 'Mitochondria+Diagram' },
      { q: 'What is the process of cell division for growth?', o: ['Meiosis', 'Mitosis', 'Binary fission', 'Budding'], a: 1, img: 'Mitosis+Cell+Division' },
      { q: 'What is the largest organ in the human body?', o: ['Liver', 'Skin', 'Brain', 'Lungs'], a: 1, img: 'Human+Skin+Anatomy' },
      { q: 'What system transports blood in the body?', o: ['Nervous system', 'Respiratory system', 'Circulatory system', 'Digestive system'], a: 2, img: 'Circulatory+System+Diagram' },
      { q: 'What is the function of the ribosomes?', o: ['Protein synthesis', 'Lipid synthesis', 'Energy production', 'DNA replication'], a: 0 },
      { q: 'What type of reproduction requires two parents?', o: ['Asexual', 'Sexual', 'Budding', 'Fission'], a: 1 },
      { q: 'What is the green pigment in plants called?', o: ['Carotene', 'Chlorophyll', 'Xanthophyll', 'Anthocyanin'], a: 1, img: 'Chloroplast+in+Plant+Cell' },
      { q: 'What is the study of heredity called?', o: ['Ecology', 'Genetics', 'Evolution', 'Taxonomy'], a: 1, img: 'DNA+Double+Helix' },
      { q: 'What is the function of the nervous system?', o: ['Digest food', 'Coordinate response to stimuli', 'Pump blood', 'Exchange gases'], a: 1, img: 'Nervous+System+Diagram' },
      { q: 'How many chambers does the human heart have?', o: ['2', '3', '4', '5'], a: 2, img: 'Human+Heart+Chambers' },
      { q: 'What is the main function of the root system?', o: ['Photosynthesis', 'Support and absorption', 'Reproduction', 'Transpiration'], a: 1, img: 'Plant+Root+Structure' },
      { q: 'What is an ecosystem?', o: ['A single organism', 'Interacting organisms and their environment', 'Only plants in an area', 'Only animals in an area'], a: 1 },
      { q: 'What is the liquid part of blood called?', o: ['Plasma', 'Serum', 'Cytosol', 'Lymph'], a: 0, img: 'Blood+Components+Diagram' },
      { q: 'What is the process by which plants lose water vapor?', o: ['Photosynthesis', 'Respiration', 'Transpiration', 'Guttation'], a: 2, img: 'Transpiration+in+Plants' },
      { q: 'What is the function of white blood cells?', o: ['Carry oxygen', 'Fight infection', 'Clot blood', 'Carry nutrients'], a: 1 },
      { q: 'What is the structural unit of the nervous system?', o: ['Axon', 'Neuron', 'Dendrite', 'Synapse'], a: 1, img: 'Neuron+Structure' },
      { q: 'What type of symmetry does a starfish have?', o: ['Bilateral', 'Radial', 'Asymmetry', 'Spherical'], a: 1, img: 'Starfish+Body+Symmetry' },
      { q: 'What is the main male reproductive hormone?', o: ['Estrogen', 'Progesterone', 'Testosterone', 'Adrenaline'], a: 2 },
      { q: 'What is the powerhouse of the cell?', o: ['Nucleus', 'Mitochondria', 'Chloroplast', 'Ribosome'], a: 1, img: 'Mitochondria+Structure' }
    ]
  },

  SSS2: {
    Mathematics: [
      { q: 'What is the derivative of x\u00b2?', o: ['x', '2x', '2x\u00b2', 'x\u00b2/2'], a: 1 },
      { q: 'What is the logarithm of 100 to base 10?', o: ['1', '2', '3', '10'], a: 1 },
      { q: 'Find the distance between points (1,2) and (4,6).', o: ['4', '5', '6', '7'], a: 1 },
      { q: 'What is the sum to infinity of 1 + 1/2 + 1/4 + ...?', o: ['1.5', '2', '2.5', '3'], a: 1 },
      { q: 'What is the cofactor of element a\u2081\u2081 in [[1,2],[3,4]]?', o: ['1', '2', '3', '4'], a: 3 },
      { q: 'If sin \u03b8 = 0.6, what is \u03b8 in degrees (approx)?', o: ['30\u00b0', '37\u00b0', '45\u00b0', '53\u00b0'], a: 1 },
      { q: 'What is the equation of a circle with centre (0,0) radius 3?', o: ['x\u00b2 + y\u00b2 = 3', 'x\u00b2 + y\u00b2 = 9', 'x\u00b2 + y\u00b2 = 6', '(x-3)\u00b2 + (y-3)\u00b2 = 9'], a: 1 },
      { q: 'What is the value of 5P3?', o: ['15', '30', '60', '120'], a: 2 },
      { q: 'What is the area between y = x and y = x\u00b2 from x=0 to x=1?', o: ['1/2', '1/3', '1/6', '1/4'], a: 2 },
      { q: 'What is the common ratio of 2, 6, 18, 54?', o: ['2', '3', '4', '6'], a: 1 },
      { q: 'What is the angle between vectors (1,0) and (0,1)?', o: ['0\u00b0', '45\u00b0', '60\u00b0', '90\u00b0'], a: 3 },
      { q: 'What is the integral of 2x dx?', o: ['x\u00b2 + c', '2x\u00b2 + c', 'x + c', 'x\u00b3/3 + c'], a: 0 },
      { q: 'What is the equation of a line with slope 2 passing through (0,3)?', o: ['y = 2x + 3', 'y = 3x + 2', 'y = 2x - 3', 'y = x + 3'], a: 0 },
      { q: 'What is 8C3?', o: ['24', '40', '56', '72'], a: 2 },
      { q: 'If log y = 2 + log x, what is y in terms of x?', o: ['y = 100x', 'y = 20x', 'y = 2x', 'y = x + 2'], a: 0 },
      { q: 'What is the period of sin 2x?', o: ['\u03c0', '2\u03c0', '\u03c0/2', '4\u03c0'], a: 0 },
      { q: 'What is the minimum value of x\u00b2 - 4x + 7?', o: ['1', '3', '5', '7'], a: 1 },
      { q: 'What is the scalar product of (1,2) and (3,4)?', o: ['10', '11', '12', '14'], a: 1 },
      { q: 'What is 0.00034 in standard form?', o: ['3.4 \u00d7 10\u207b\u2074', '34 \u00d7 10\u207b\u2075', '3.4 \u00d7 10\u2074', '34 \u00d7 10\u207b\u2084'], a: 0 },
      { q: 'What is the sum of the roots of x\u00b2 - 5x + 6 = 0?', o: ['-5', '5', '-6', '6'], a: 1 }
    ],
    Physics: [
      { q: 'What is the capacitance of a parallel plate capacitor dependent on?', o: ['Area and distance', 'Only area', 'Only distance', 'Material only'], a: 0 },
      { q: 'What is Lenz\u2019s law about?', o: ['Direction of induced current', 'Ohm\u2019s law', 'Conservation of energy', 'Force on a wire'], a: 0 },
      { q: 'What is the value of the permittivity of free space?', o: ['8.85 \u00d7 10\u207b\u00b9\u00b2', '9.11 \u00d7 10\u207b\u00b3\u00b9', '6.02 \u00d7 10\u00b2\u00b3', '3 \u00d7 10\u2078'], a: 0 },
      { q: 'What is the kinetic energy of a 2 kg mass moving at 3 m/s?', o: ['6 J', '9 J', '12 J', '18 J'], a: 1 },
      { q: 'What is the power of a lens with focal length 0.5 m?', o: ['0.5 D', '1 D', '2 D', '5 D'], a: 2 },
      { q: 'What is the internal resistance of an ideal voltmeter?', o: ['Zero', 'Infinite', '1 \u03a9', '100 \u03a9'], a: 1 },
      { q: 'What is the beat frequency when 256 Hz and 260 Hz are sounded together?', o: ['2 Hz', '4 Hz', '8 Hz', '516 Hz'], a: 1 },
      { q: 'What is the properties of a real image?', o: ['Can be projected on a screen', 'Always upright', 'Always virtual', 'Cannot be seen'], a: 0 },
      { q: 'What is the unit of magnetic flux?', o: ['Tesla', 'Weber', 'Henry', 'Gauss'], a: 1 },
      { q: 'What is the force on a charge in an electric field?', o: ['F = qE', 'F = qvB', 'F = ma', 'F = kq\u2081q\u2082/r\u00b2'], a: 0 },
      { q: 'What is the energy stored in a capacitor?', o: ['CV/2', 'CV\u00b2/2', 'C\u00b2V/2', 'CV/4'], a: 1 },
      { q: 'What happens when light passes from air to glass?', o: ['Speeds up and bends away', 'Slows down and bends toward normal', 'Slows down and bends away', 'No change'], a: 1 },
      { q: 'What is an isotope?', o: ['Same protons, different neutrons', 'Same neutrons, different protons', 'Same mass number, different atomic number', 'Different electrons'], a: 0 },
      { q: 'What is the photoelectric effect?', o: ['Emission of electrons when light hits a metal', 'Reflection of light', 'Refraction of light', 'Absorption of photons'], a: 0 },
      { q: 'What is the efficiency of a machine?', o: ['(MA/VR) \u00d7 100%', 'MA \u00d7 VR', 'VR/MA', 'Work input/work output'], a: 0 },
      { q: 'What type of waves are electromagnetic waves?', o: ['Longitudinal', 'Transverse', 'Both', 'Neither'], a: 1 },
      { q: 'What is the center of gravity?', o: ['The point where weight acts', 'The center of mass', 'The bottom of an object', 'The heaviest part'], a: 0 },
      { q: 'What is terminal velocity?', o: ['Initial speed', 'Constant speed when drag equals weight', 'Maximum possible speed', 'Speed at impact'], a: 1 },
      { q: 'What is the law of reflection?', o: ['Angle of incidence equals angle of reflection', 'Light travels in straight lines', 'Reflection depends on color', 'Angle is always 90\u00b0'], a: 0 },
      { q: 'What is Young\u2019s modulus a measure of?', o: ['Stiffness', 'Density', 'Hardness', 'Ductility'], a: 0 }
    ],
    Chemistry: [
      { q: 'What is the functional group of alkanols?', o: ['-COOH', '-OH', '-CHO', '-NH2'], a: 1 },
      { q: 'What is the IUPAC name of CH3CH2CH3?', o: ['Methane', 'Ethane', 'Propane', 'Butane'], a: 2 },
      { q: 'What is the state of matter with the least kinetic energy?', o: ['Gas', 'Liquid', 'Solid', 'Plasma'], a: 2 },
      { q: 'What is the common name of ethanoic acid?', o: ['Hydrochloric acid', 'Citric acid', 'Acetic acid', 'Sulfuric acid'], a: 2 },
      { q: 'What is the difference between a saturated and unsaturated hydrocarbon?', o: ['Number of carbons', 'Presence of double/triple bonds', 'Molecular weight', 'State at room temp'], a: 1 },
      { q: 'What is Le Chatelier\u2019s principle about?', o: ['Reaction rates', 'Equilibrium shift when stressed', 'Activation energy', 'Catalysis'], a: 1 },
      { q: 'What is the general formula of alkanes?', o: ['CnH2n+2', 'CnH2n', 'CnH2n-2', 'CnHn'], a: 0 },
      { q: 'What is the purpose of a condenser in distillation?', o: ['Heat the mixture', 'Cool and condense vapor', 'Separate solids', 'Increase pressure'], a: 1 },
      { q: 'What is the hybridization in methane?', o: ['sp', 'sp\u00b2', 'sp\u00b3', 'dsp\u00b3'], a: 2 },
      { q: 'What is an isomer?', o: ['Same formula, different structure', 'Same structure, different formula', 'Different elements', 'Same atomic mass'], a: 0 },
      { q: 'What is the reaction of an alkene with hydrogen called?', o: ['Hydration', 'Hydrogenation', 'Halogenation', 'Dehydration'], a: 1 },
      { q: 'What is electrolysis?', o: ['Heating a compound', 'Decomposition using electricity', 'Dissolving in water', 'Burning a substance'], a: 1 },
      { q: 'What is a standard electrode potential?', o: ['Voltage under standard conditions', 'Current at 25\u00b0C', 'Resistance of electrode', 'Power of cell'], a: 0 },
      { q: 'What is the chemical name of baking soda?', o: ['Sodium carbonate', 'Sodium bicarbonate', 'Calcium carbonate', 'Sodium hydroxide'], a: 1 },
      { q: 'What is an endothermic reaction?', o: ['Releases heat', 'Absorbs heat', 'Produces light', 'Produces gas'], a: 1 },
      { q: 'What is the oxidation state of Mn in KMnO4?', o: ['+5', '+6', '+7', '+4'], a: 2 },
      { q: 'What is the molecular geometry of water?', o: ['Linear', 'Trigonal planar', 'Bent', 'Tetrahedral'], a: 2 },
      { q: 'What is the order of reactivity of halogens?', o: ['F > Cl > Br > I', 'I > Br > Cl > F', 'Cl > F > Br > I', 'Br > Cl > F > I'], a: 0 },
      { q: 'What is the number of moles in 18 g of water?', o: ['0.5', '1', '1.5', '2'], a: 1 },
      { q: 'What is the bond angle in a tetrahedral molecule?', o: ['90\u00b0', '104.5\u00b0', '109.5\u00b0', '120\u00b0'], a: 2 }
    ],
    Biology: [
      { q: 'What is the function of tRNA?', o: ['Carries amino acids to ribosomes', 'Carries genetic code', 'Forms ribosomes', 'Replicates DNA'], a: 0 },
      { q: 'What is the number of chromosomes in a human cell?', o: ['23', '46', '48', '24'], a: 1, img: 'Human+Karyotype+Chromosomes' },
      { q: 'What is a mutation?', o: ['Change in DNA sequence', 'Cell division', 'Protein synthesis', 'Energy production'], a: 0, img: 'DNA+Mutation+Diagram' },
      { q: 'What is an allele?', o: ['A type of chromosome', 'Alternative form of a gene', 'A protein', 'A cell organelle'], a: 1 },
      { q: 'What is the theory of natural selection associated with?', o: ['Lamarck', 'Darwin', 'Mendel', 'Linnaeus'], a: 1 },
      { q: 'What is the percentage of water in human blood?', o: ['55%', '65%', '75%', '85%'], a: 2 },
      { q: 'What is the role of decomposers in an ecosystem?', o: ['Produce food', 'Break down dead matter', 'Hunt prey', 'Pollinate flowers'], a: 1 },
      { q: 'What is the name of the double membrane around the nucleus?', o: ['Cell wall', 'Nuclear envelope', 'Plasma membrane', 'Endoplasmic reticulum'], a: 1, img: 'Cell+Nucleus+Membrane' },
      { q: 'What is the function of the small intestine?', o: ['Absorb water', 'Digest and absorb nutrients', 'Store food', 'Produce bile'], a: 1, img: 'Small+Intestine+Diagram' },
      { q: 'What is the process of making mRNA from DNA?', o: ['Translation', 'Transcription', 'Replication', 'Transformation'], a: 1, img: 'DNA+Transcription+Process' },
      { q: 'What is an artery?', o: ['Carries blood to the heart', 'Carries blood away from heart', 'Carries deoxygenated blood', 'Thin-walled vessel'], a: 1, img: 'Artery+Cross+Section' },
      { q: 'What is the shape of DNA?', o: ['Single helix', 'Double helix', 'Triple helix', 'Circular'], a: 1, img: 'DNA+Double+Helix+Model' },
      { q: 'What is a trophic level?', o: ['A feeding level in an ecosystem', 'A type of organism', 'A chemical cycle', 'A habitat'], a: 0, img: 'Trophic+Level+Pyramid' },
      { q: 'What is the function of the pancreas?', o: ['Produces insulin and digestive enzymes', 'Filters blood', 'Produces bile', 'Stores glycogen'], a: 0, img: 'Pancreas+Anatomy+Diagram' },
      { q: 'What is a vestigial organ?', o: ['A vital organ', 'A reduced organ with no apparent function', 'An organ only in embryos', 'A sensory organ'], a: 1, img: 'Vestigial+Organs+Examples' },
      { q: 'What is the function of the alveoli?', o: ['Digestion', 'Gas exchange', 'Blood filtration', 'Bile production'], a: 1, img: 'Alveoli+Gas+Exchange' },
      { q: 'What is the genotype of a carrier for sickle cell trait?', o: ['AA', 'AS', 'SS', 'AC'], a: 1, img: 'Sickle+Cell+Trait+Genetics' },
      { q: 'What is the primary source of energy for ecosystems?', o: ['Water', 'Sun', 'Soil', 'Air'], a: 1 },
      { q: 'What is mitosis?', o: ['Cell division for gametes', 'Cell division for growth and repair', 'Cell death', 'Cell specialization'], a: 1 },
      { q: 'What is the function of chlorophyll?', o: ['Absorb light energy', 'Produce oxygen', 'Fix carbon dioxide', 'Transport water'], a: 0 }
    ]
  },

  SSS3: {
    Mathematics: [
      { q: 'What is the derivative of e^x?', o: ['e^x', 'xe^(x-1)', 'e^x * x', 'ln x'], a: 0 },
      { q: 'What is the value of the integral of 1/x dx?', o: ['x + c', 'ln x + c', '1/x\u00b2 + c', 'e^x + c'], a: 1 },
      { q: 'What is the product of the roots of ax\u00b2 + bx + c = 0?', o: ['-b/a', 'c/a', '-c/a', 'b/a'], a: 1 },
      { q: 'What is the modulus of 3 + 4i?', o: ['5', '7', '25', '1'], a: 0 },
      { q: 'What is the probability of getting 2 heads in 3 coin tosses?', o: ['1/8', '3/8', '1/4', '1/2'], a: 1 },
      { q: 'What is the variance of {2, 4, 6, 8, 10}?', o: ['4', '6', '8', '10'], a: 2 },
      { q: 'What is the scalar triple product [a,b,c]?', o: ['a \u00d7 (b \u00b7 c)', 'a \u00b7 (b \u00d7 c)', '(a \u00b7 b) \u00d7 c', 'a \u00d7 b \u00d7 c'], a: 1 },
      { q: 'What is the eccentricity of a circle?', o: ['0', '1', '>1', '<1'], a: 0 },
      { q: 'What is the solution of dy/dx = ky?', o: ['y = Ce^(kx)', 'y = Ckx', 'y = Ck/x', 'y = C + kx'], a: 0 },
      { q: 'What is the equation of the tangent to x\u00b2 + y\u00b2 = 25 at (3,4)?', o: ['3x + 4y = 25', '3x - 4y = 25', '4x + 3y = 25', 'x + y = 7'], a: 0 },
      { q: 'What is 2P(E) if P(E) = 0.3?', o: ['0.3', '0.6', '0.9', '1.2'], a: 1 },
      { q: 'What is the area of a sector with angle 60\u00b0 and radius 6?', o: ['6\u03c0', '12\u03c0', '18\u03c0', '36\u03c0'], a: 0 },
      { q: 'What is the inverse of matrix [[1,0],[0,1]]?', o: ['[[1,0],[0,1]]', '[[-1,0],[0,-1]]', '[[0,1],[1,0]]', '[[1,1],[0,1]]'], a: 0 },
      { q: 'What is the domain of f(x) = \u221a(x-2)?', o: ['x \u2265 0', 'x \u2265 2', 'x \u2264 2', 'All real numbers'], a: 1 },
      { q: 'What is the mean of a binomial distribution with n=10, p=0.5?', o: ['2', '5', '10', '0.5'], a: 1 },
      { q: 'What is the limit of (sin x)/x as x\u21920?', o: ['0', '1', '\u221e', '-1'], a: 1 },
      { q: 'What is the radius of convergence of \u03a3 x^n/n!?', o: ['0', '1', '\u221e', '-1'], a: 2 },
      { q: 'What is the second derivative of x\u00b3?', o: ['3x', '6x', '3x\u00b2', '6x\u00b2'], a: 1 },
      { q: 'What is the cross product of (1,0,0) and (0,1,0)?', o: ['(0,0,1)', '(0,0,-1)', '(1,1,0)', '(0,0,0)'], a: 0 },
      { q: 'What is the range of f(x) = sin x?', o: ['[-1, 1]', '[0, 1]', 'All real numbers', '(-\u221e, \u221e)'], a: 0 }
    ],
    Physics: [
      { q: 'What is the half-life of a radioactive substance?', o: ['Time for half to decay', 'Time to decay completely', 'Half the mass', 'Double the energy'], a: 0 },
      { q: 'What are alpha particles composed of?', o: ['Electrons', 'Helium nuclei', 'Protons', 'Neutrons'], a: 1 },
      { q: 'What is nuclear fission?', o: ['Splitting of a nucleus', 'Combining of nuclei', 'Radioactive decay', 'Gamma emission'], a: 0 },
      { q: 'What is the de Broglie wavelength of a particle?', o: ['\u03bb = h/p', '\u03bb = hf', '\u03bb = c/f', '\u03bb = mc/h'], a: 0 },
      { q: 'What is binding energy?', o: ['Energy to split a nucleus', 'Energy to assemble nucleons', 'Kinetic energy of nucleus', 'Chemical bond energy'], a: 1 },
      { q: 'What is the band gap of an insulator?', o: ['Small', 'Large', 'Zero', 'Negative'], a: 1 },
      { q: 'What is the p-n junction used for?', o: ['Rectification', 'Amplification', 'Oscillation', 'All of the above'], a: 3 },
      { q: 'What is the particle responsible for mediating the electromagnetic force?', o: ['Gluon', 'Photon', 'W boson', 'Graviton'], a: 1 },
      { q: 'What is the uncertainty principle?', o: ["\u0394x \u00b7 \u0394p \u2265 h/4\u03c0", '\u0394E \u00b7 \u0394t = 0', '\u0394x \u00b7 \u0394p \u2264 h', '\u0394p \u00b7 \u0394t \u2265 h'], a: 0 },
      { q: 'What is a semiconductor doped with arsenic called?', o: ['p-type', 'n-type', 'Intrinsic', 'Insulator'], a: 1 },
      { q: 'What is the SI unit of radioactivity?', o: ['Becquerel', 'Gray', 'Sievert', 'Curie'], a: 0 },
      { q: 'What is the operation of a laser based on?', o: ['Stimulated emission', 'Spontaneous emission', 'Thermal radiation', 'Blackbody radiation'], a: 0 },
      { q: 'What is the mass-energy equivalence equation?', o: ['E = mc\u00b2', 'E = hf', 'E = 1/2 mv\u00b2', 'E = qV'], a: 0 },
      { q: 'What is the temperature of a blackbody related to?', o: ['Color of emitted light', 'Size of the body', 'Density', 'Mass'], a: 0 },
      { q: 'What is the function of a moderator in a nuclear reactor?', o: ['Absorb neutrons', 'Slow down neutrons', 'Speed up neutrons', 'Produce neutrons'], a: 1 },
      { q: 'What is the Hall effect used for?', o: ['Measure magnetic field', 'Measure temperature', 'Measure pressure', 'Measure humidity'], a: 0 },
      { q: 'What is the principle of a transformer?', o: ['Electromagnetic induction', 'Electrostatic induction', 'Thermoelectric effect', 'Photoelectric effect'], a: 0 },
      { q: 'What is the speed of all electromagnetic waves in a vacuum?', o: ['3 \u00d7 10\u2078 m/s', '3 \u00d7 10\u2076 m/s', '3 \u00d7 10\u00b9\u2070 m/s', 'Depends on frequency'], a: 0 },
      { q: 'What is the direction of induced current given by?', o: ["Faraday's law", "Lenz's law", "Ohm's law", "Kirchhoff's law"], a: 1 },
      { q: 'What is the atomic number of Uranium?', o: ['90', '92', '94', '96'], a: 1 }
    ],
    Chemistry: [
      { q: 'What is the activation energy?', o: ['Minimum energy for reaction', 'Heat of reaction', 'Average kinetic energy', 'Total bond energy'], a: 0 },
      { q: 'What is the rate law for a first-order reaction?', o: ['Rate = k[A]', 'Rate = k[A]\u00b2', 'Rate = k', 'Rate = k[A][B]'], a: 0 },
      { q: 'What is the unit of rate constant for a zero-order reaction?', o: ['s\u207b\u00b9', 'M s\u207b\u00b9', 'M\u207b\u00b9 s\u207b\u00b9', 'M\u207b\u00b2 s\u207b\u00b9'], a: 1 },
      { q: 'What is the transition state?', o: ['Reactant', 'High-energy intermediate', 'Product', 'Catalyst'], a: 1 },
      { q: 'What is the solubility product of a salt?', o: ['Ksp', 'Kw', 'Ka', 'Kb'], a: 0 },
      { q: 'What is the pH of a 0.01 M HCl solution?', o: ['1', '2', '3', '4'], a: 1 },
      { q: 'What is the conjugate base of NH4+?', o: ['NH3', 'NH2-', 'N3-', 'NH4OH'], a: 0 },
      { q: 'What is a buffer solution?', o: ['Resists pH change', 'Has pH = 7', 'Always acidic', 'Always basic'], a: 0 },
      { q: 'What is the strongest intermolecular force?', o: ['London forces', 'Dipole-dipole', 'Hydrogen bonding', 'Ionic bonding'], a: 2 },
      { q: 'What is the electron affinity of an element?', o: ['Energy released when gaining an electron', 'Energy to remove an electron', 'Electronegativity', 'Ionization energy'], a: 0 },
      { q: 'What is the standard enthalpy change?', o: ['Heat change at 1 atm and 298 K', 'Heat at any temperature', 'Heat at constant volume', 'Heat of formation'], a: 0 },
      { q: 'What is entropy a measure of?', o: ['Disorder in a system', 'Energy in a system', 'Temperature', 'Pressure'], a: 0 },
      { q: 'What is the Gibbs free energy equation?', o: ['G = H - TS', 'G = H + TS', 'G = E - TS', 'G = H - TV'], a: 0 },
      { q: 'What is the coordination number of a simple cubic?', o: ['4', '6', '8', '12'], a: 1 },
      { q: 'What is the function of a salt bridge?', o: ['Complete the circuit', 'Prevent mixing', 'Increase voltage', 'Generate current'], a: 0 },
      { q: 'What is the d-orbital splitting in an octahedral complex?', o: ['t2g and eg', 'eg and t2g', 'dxy and dz2', 'dxz and dyz'], a: 0 },
      { q: 'What is the product of a Kolbe electrolysis?', o: ['Alkane', 'Alkene', 'Alkyne', 'Alcohol'], a: 0 },
      { q: 'What is the reagent for Fehling\u2019s test?', o: ['Tests for aldehydes', 'Tests for ketones', 'Tests for acids', 'Tests for alcohols'], a: 0 },
      { q: 'What is the formula of nylon 6,6?', o: ['(-NH-(CH2)6-NH-CO-(CH2)4-CO-)n', '(-CH2-CH2-)n', '(-C6H6-)n', '(-Si-O-)n'], a: 0 },
      { q: 'What is the hybridization in ethene?', o: ['sp', 'sp\u00b2', 'sp\u00b3', 'sp\u00b3d'], a: 1 }
    ],
    Biology: [
      { q: 'What is the endocrine system?', o: ['Nervous system', 'Glands that secrete hormones', 'Digestive system', 'Excretory system'], a: 1, img: 'Endocrine+System+Glands' },
      { q: 'What is positive feedback in homeostasis?', o: ['Amplifies a change', 'Reverses a change', 'Maintains constant condition', 'Reduces deviation'], a: 0 },
      { q: 'What is the role of the pituitary gland?', o: ['Master gland controlling other glands', 'Regulates metabolism', 'Produces adrenaline', 'Controls digestion'], a: 0, img: 'Pituitary+Gland+Location' },
      { q: 'What is a hormone?', o: ['A chemical messenger', 'A nerve signal', 'A protein only', 'A type of enzyme'], a: 0 },
      { q: 'What is the function of insulin?', o: ['Increase blood sugar', 'Decrease blood sugar', 'Digest fats', 'Produce urine'], a: 1 },
      { q: 'What is the structure of a leaf adapted for?', o: ['Photosynthesis', 'Reproduction', 'Storage', 'Support'], a: 0, img: 'Leaf+Cross+Section+Diagram' },
      { q: 'What are xerophytes adapted to?', o: ['Dry conditions', 'Wet conditions', 'Cold conditions', 'Salty conditions'], a: 0, img: 'Xerophyte+Cactus+Adaptation' },
      { q: 'What is succession in ecology?', o: ['Change in species over time', 'Food chain', 'Predator-prey relationship', 'Symbiosis'], a: 0, img: 'Ecological+Succession+Stages' },
      { q: 'What is a climax community?', o: ['Final stable community', 'First species to colonize', 'Group of predators', 'Decomposer community'], a: 0 },
      { q: 'What is a gene pool?', o: ['Total genetic information in a population', 'Collection of genes in a lab', 'All alleles in a single organism', 'DNA of a species'], a: 0 },
      { q: 'What is genetic drift?', o: ['Random change in allele frequency', 'Natural selection', 'Gene flow', 'Mutation rate'], a: 0, img: 'Genetic+Drift+Population' },
      { q: 'What is the process of bone formation called?', o: ['Ossification', 'Calcification', 'Osteogenesis', 'Mineralization'], a: 0, img: 'Bone+Ossification+Process' },
      { q: 'What is the function of myelin sheath?', o: ['Insulate nerve fibers', 'Transmit signals', 'Produce energy', 'Synthesize proteins'], a: 0, img: 'Myelin+Sheath+Neuron' },
      { q: 'What is the main pigment in human skin?', o: ['Keratin', 'Melanin', 'Carotene', 'Hemoglobin'], a: 1, img: 'Melanin+Skin+Pigment' },
      { q: 'What is the function of the placenta?', o: ['Exchange nutrients and waste', 'Produce hormones', 'Protect fetus', 'All of the above'], a: 3, img: 'Placenta+Structure+Diagram' },
      { q: 'What is the structure responsible for hearing?', o: ['Cochlea', 'Semicircular canals', 'Eardrum', 'Eustachian tube'], a: 0, img: 'Cochlea+Inner+Ear+Anatomy' },
      { q: 'What is the role of the lymph nodes?', o: ['Filter pathogens', 'Produce red blood cells', 'Digest fats', 'Store minerals'], a: 0, img: 'Lymphatic+System+Diagram' },
      { q: 'What is the function of the cerebellum?', o: ['Balance and coordination', 'Memory', 'Speech', 'Vision'], a: 0, img: 'Cerebellum+Brain+Function' },
      { q: 'What is the process of gamete formation called?', o: ['Gametogenesis', 'Mitosis', 'Fertilization', 'Embryogenesis'], a: 0 },
      { q: 'What is the function of ATP?', o: ['Energy currency of the cell', 'Genetic material', 'Structural component', 'Enzyme catalyst'], a: 0, img: 'ATP+Energy+Molecule' }
    ]
  }
}

// ===== DOM REFS =====
const dom = {
  screens: $$('.screen'),
  loginForm: $('#login-form'),
  studentName: $('#student-name'),
  displayName: $('#display-name'),
  btnLogout: $('#btn-logout'),
  classSelect: $('#class-select'),
  subjectSelect: $('#subject-select'),
  questionCountPicker: $('#question-count-picker'),
  btnStart: $('#btn-start'),
  btnHistory: $('#btn-history'),
  statsSummary: $('#stats-summary'),
  testSubject: $('#test-subject-display'),
  testClass: $('#test-class-display'),
  timerDisplay: $('#timer-display'),
  progressFill: $('#progress-fill'),
  questionCounter: $('#question-counter'),
  questionText: $('#question-text'),
  questionCard: $('#question-text').parentElement,
  optionsContainer: $('#options-container'),
  btnPrev: $('#btn-prev'),
  btnNext: $('#btn-next'),
  btnSubmit: $('#btn-submit'),
  scoreCircle: $('#score-circle'),
  scoreNumber: $('#score-number'),
  resultSubject: $('#result-subject'),
  resultClass: $('#result-class'),
  resultScore: $('#result-score'),
  resultTime: $('#result-time'),
  resultStatus: $('#result-status'),
  reviewContainer: $('#review-container'),
  btnRetake: $('#btn-retake'),
  btnBackDashboard: $('#btn-back-dashboard'),
  historyContainer: $('#history-container'),
  btnBackDashboard2: $('#btn-back-dashboard-2')
}

// ===== NAVIGATION =====
function showScreen(id) {
  dom.screens.forEach(el => el.classList.remove('active'))
  $(`#screen-${id}`).classList.add('active')
  state.screen = id
}

// ===== STORAGE =====
function loadData() {
  try {
    state.testHistory = JSON.parse(localStorage.getItem('stemCbtHistory')) || []
  } catch { state.testHistory = [] }
  try {
    const saved = localStorage.getItem('stemCbtStudent')
    if (saved) state.studentName = saved
  } catch {}
}

function saveHistory() {
  localStorage.setItem('stemCbtHistory', JSON.stringify(state.testHistory))
}

function saveStudent(name) {
  localStorage.setItem('stemCbtStudent', name)
}

// ===== LOGIN =====
dom.loginForm.addEventListener('submit', e => {
  e.preventDefault()
  const name = dom.studentName.value.trim()
  if (name) {
    state.studentName = name
    saveStudent(name)
    dom.displayName.textContent = name
    showScreen('dashboard')
    updateSubjects()
    renderStats()
  }
})

// ===== LOGOUT =====
dom.btnLogout.addEventListener('click', () => {
  state.studentName = ''
  dom.studentName.value = ''
  showScreen('login')
})

// ===== DASHBOARD =====
function updateSubjects() {
  const cls = dom.classSelect.value
  const subjEl = dom.subjectSelect
  subjEl.innerHTML = ''
  if (!cls) {
    subjEl.innerHTML = '<option value="">-- Choose Class First --</option>'
    subjEl.disabled = true
    dom.btnStart.disabled = true
    return
  }
  const subjects = subjectsByClass[cls] || []
  subjEl.appendChild(new Option('-- Select Subject --', ''))
  subjects.forEach(s => subjEl.appendChild(new Option(s, s)))
  subjEl.disabled = false
  dom.btnStart.disabled = true
}

dom.classSelect.addEventListener('change', updateSubjects)

dom.subjectSelect.addEventListener('change', () => {
  dom.btnStart.disabled = !dom.subjectSelect.value
})

dom.btnStart.addEventListener('click', startTest)

// Question count picker
dom.questionCountPicker.addEventListener('click', e => {
  const opt = e.target.closest('.ios-picker-option')
  if (!opt) return
  $$('.ios-picker-option', dom.questionCountPicker).forEach(el => el.classList.remove('selected'))
  opt.classList.add('selected')
})

dom.btnHistory.addEventListener('click', () => {
  renderHistory()
  showScreen('history')
})

// ===== START TEST =====
function startTest() {
  const cls = dom.classSelect.value
  const subj = dom.subjectSelect.value
  const selOpt = $('.ios-picker-option.selected', dom.questionCountPicker)
  const count = parseInt(selOpt ? selOpt.dataset.value : 10)
  if (!cls || !subj) return
  const pool = (QB[cls] && QB[cls][subj]) || []
  if (!pool.length) {
    alert('No questions available for this subject yet.')
    return
  }
  // Shuffle and pick
  const shuffled = [...pool].sort(() => Math.random() - 0.5)
  state.questions = shuffled.slice(0, Math.min(count, shuffled.length))
  state.currentIndex = 0
  state.answers = {}
  state.class = cls
  state.subject = subj
  state.questionCount = state.questions.length

  dom.testSubject.textContent = subj
  dom.testClass.textContent = cls

  showScreen('test')
  renderQuestion()
  startTimer()
}

// ===== IMAGE HELPER =====
function imgHTML(q) {
  if (!q.img) return ''
  const src = `https://placehold.co/600x320/e8f0fe/1a73e8?text=${encodeURIComponent(q.img)}`
  return `<div class="question-image"><img src="${src}" alt="${q.img}" loading="lazy"></div>`
}

// ===== TEST ENGINE =====
function renderQuestion() {
  const idx = state.currentIndex
  const q = state.questions[idx]
  if (!q) return
  const total = state.questions.length

  dom.questionCounter.textContent = `Question ${idx + 1} of ${total}`
  dom.progressFill.style.width = `${((idx + 1) / total) * 100}%`

  const imgEl = dom.questionCard.querySelector('.question-image')
  if (imgEl) imgEl.remove()
  if (q.img) {
    dom.questionCard.insertAdjacentHTML('afterbegin', imgHTML(q))
  }

  dom.questionText.textContent = q.q

  dom.optionsContainer.innerHTML = ''
  q.o.forEach((opt, i) => {
    const div = document.createElement('div')
    div.className = 'option'
    if (state.answers[idx] === i) div.classList.add('selected')
    div.innerHTML = `<span class="letter">${LETTERS[i]}</span><span>${opt}</span>`
    div.addEventListener('click', () => selectOption(i))
    dom.optionsContainer.appendChild(div)
  })

  dom.btnPrev.disabled = idx === 0
  dom.btnNext.style.display = idx === total - 1 ? 'none' : ''
  dom.btnSubmit.style.display = idx === total - 1 ? '' : 'none'
}

function selectOption(index) {
  state.answers[state.currentIndex] = index
  $$('.option', dom.optionsContainer).forEach((el, i) => {
    el.classList.toggle('selected', i === index)
  })
}

dom.btnPrev.addEventListener('click', () => {
  if (state.currentIndex > 0) {
    state.currentIndex--
    renderQuestion()
  }
})

dom.btnNext.addEventListener('click', () => {
  if (state.currentIndex < state.questions.length - 1) {
    state.currentIndex++
    renderQuestion()
  }
})

dom.btnSubmit.addEventListener('click', finishTest)

// ===== TIMER =====
function startTimer() {
  state.timer = state.questions.length * 60 // seconds per question
  updateTimerDisplay()
  if (state.timerInterval) clearInterval(state.timerInterval)
  state.timerInterval = setInterval(() => {
    state.timer--
    updateTimerDisplay()
    if (state.timer <= 0) {
      clearInterval(state.timerInterval)
      state.timerInterval = null
      finishTest()
    }
  }, 1000)
}

function updateTimerDisplay() {
  const mins = Math.floor(state.timer / 60)
  const secs = state.timer % 60
  dom.timerDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  dom.timerDisplay.classList.remove('warning', 'danger')
  if (state.timer <= 30) dom.timerDisplay.classList.add('danger')
  else if (state.timer <= 120) dom.timerDisplay.classList.add('warning')
}

function stopTimer() {
  if (state.timerInterval) {
    clearInterval(state.timerInterval)
    state.timerInterval = null
  }
}

// ===== FINISH TEST =====
function finishTest() {
  stopTimer()
  const elapsed = state.questions.length * 60 - state.timer
  const mins = Math.floor(elapsed / 60)
  const secs = elapsed % 60
  const timeStr = `${mins} min ${secs} sec`

  let correct = 0
  state.questions.forEach((q, i) => {
    if (state.answers[i] === q.a) correct++
  })
  const total = state.questions.length
  const pct = Math.round((correct / total) * 100)

  // Save result
  const result = {
    subject: state.subject,
    cls: state.class,
    score: `${correct}/${total}`,
    pct,
    time: timeStr,
    date: new Date().toISOString(),
    questions: state.questions,
    answers: { ...state.answers }
  }
  state.testHistory.unshift(result)
  saveHistory()

  // Render result screen
  dom.resultSubject.textContent = state.subject
  dom.resultClass.textContent = state.class
  dom.resultScore.textContent = `${correct}/${total} (${pct}%)`
  dom.resultTime.textContent = timeStr

  const pass = pct >= 50
  dom.resultStatus.textContent = pass ? 'PASS' : 'FAIL'
  dom.resultStatus.className = `result-status ${pass ? 'pass' : 'fail'}`
  dom.scoreNumber.textContent = `${pct}%`
  dom.scoreCircle.style.setProperty('--score-deg', `${(pct / 100) * 360}deg`)

  // Review
  dom.reviewContainer.innerHTML = ''
  state.questions.forEach((q, i) => {
    const userAns = state.answers[i]
    const isCorrect = userAns === q.a
    const div = document.createElement('div')
    div.className = `review-item ${isCorrect ? 'correct' : 'wrong'}`
    div.innerHTML = `
      ${imgHTML(q)}
      <div class="q">Q${i + 1}: ${q.q}</div>
      <div class="a">Your answer: <span class="highlight">${userAns !== undefined ? LETTERS[userAns] + '. ' + q.o[userAns] : 'Not answered'}</span></div>
      ${!isCorrect ? `<div class="a">Correct answer: <span class="highlight">${LETTERS[q.a]}. ${q.o[q.a]}</span></div>` : ''}
    `
    dom.reviewContainer.appendChild(div)
  })

  showScreen('result')
}

// ===== RESULT SCREEN =====
dom.btnRetake.addEventListener('click', () => {
  dom.classSelect.value = state.class
  dom.subjectSelect.value = state.subject
  updateSubjects()
  dom.subjectSelect.value = state.subject
  dom.btnStart.disabled = false
  showScreen('dashboard')
})

dom.btnBackDashboard.addEventListener('click', () => {
  showScreen('dashboard')
  renderStats()
})

// ===== HISTORY =====
function renderHistory() {
  dom.historyContainer.innerHTML = ''
  if (!state.testHistory.length) {
    dom.historyContainer.innerHTML = '<p class="empty-state">No tests taken yet.</p>'
    return
  }
  state.testHistory.forEach((h, i) => {
    const d = new Date(h.date)
    const dateStr = d.toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    const div = document.createElement('div')
    div.className = 'history-item'
    div.innerHTML = `
      <div class="h-main">
        <div>
          <div class="h-subject">${h.subject}</div>
          <div class="h-class">${h.cls}</div>
        </div>
        <div class="h-score ${h.pct >= 50 ? 'pass' : 'fail'}">${h.score}</div>
      </div>
      <div class="h-date">${dateStr}</div>
    `
    div.addEventListener('click', () => viewHistoryItem(i))
    dom.historyContainer.appendChild(div)
  })
}

function viewHistoryItem(index) {
  const h = state.testHistory[index]
  if (!h) return
  // Reuse result screen for history viewing
  dom.resultSubject.textContent = h.subject
  dom.resultClass.textContent = h.cls
  dom.resultScore.textContent = h.score + ` (${h.pct}%)`
  dom.resultTime.textContent = h.time
  const pass = h.pct >= 50
  dom.resultStatus.textContent = pass ? 'PASS' : 'FAIL'
  dom.resultStatus.className = `result-status ${pass ? 'pass' : 'fail'}`
  dom.scoreNumber.textContent = `${h.pct}%`
  dom.scoreCircle.style.setProperty('--score-deg', `${(h.pct / 100) * 360}deg`)

  dom.reviewContainer.innerHTML = ''
  ;(h.questions || []).forEach((q, i) => {
    const userAns = h.answers ? h.answers[i] : undefined
    const isCorrect = userAns === q.a
    const div = document.createElement('div')
    div.className = `review-item ${isCorrect ? 'correct' : 'wrong'}`
    div.innerHTML = `
      ${imgHTML(q)}
      <div class="q">Q${i + 1}: ${q.q}</div>
      <div class="a">Your answer: <span class="highlight">${userAns !== undefined ? LETTERS[userAns] + '. ' + q.o[userAns] : 'Not answered'}</span></div>
      ${!isCorrect ? `<div class="a">Correct answer: <span class="highlight">${LETTERS[q.a]}. ${q.o[q.a]}</span></div>` : ''}
    `
    dom.reviewContainer.appendChild(div)
  })

  showScreen('result')
}

dom.btnBackDashboard2.addEventListener('click', () => {
  showScreen('dashboard')
  renderStats()
})

// ===== STATS =====
function renderStats() {
  dom.statsSummary.innerHTML = ''
  if (!state.testHistory.length) {
    dom.statsSummary.innerHTML = '<p class="empty-state">Complete a test to see your stats.</p>'
    return
  }
  const total = state.testHistory.length
  const passed = state.testHistory.filter(h => h.pct >= 50).length
  let totalScore = 0
  let totalQ = 0
  state.testHistory.forEach(h => {
    const parts = h.score.split('/')
    if (parts.length === 2) {
      totalScore += parseInt(parts[0])
      totalQ += parseInt(parts[1])
    }
  })
  const avgPct = totalQ > 0 ? Math.round((totalScore / totalQ) * 100) : 0
  const best = Math.max(...state.testHistory.map(h => h.pct))

  dom.statsSummary.innerHTML = `
    <div class="stat-row"><span class="stat-label">Tests Taken</span><span class="stat-value">${total}</span></div>
    <div class="stat-row"><span class="stat-label">Passed</span><span class="stat-value">${passed}/${total}</span></div>
    <div class="stat-row"><span class="stat-label">Overall Average</span><span class="stat-value">${avgPct}%</span></div>
    <div class="stat-row"><span class="stat-label">Best Score</span><span class="stat-value">${best}%</span></div>
  `
}

// ===== INIT =====
loadData()
if (state.studentName) {
  dom.displayName.textContent = state.studentName
  dom.studentName.value = state.studentName
  showScreen('dashboard')
  updateSubjects()
  renderStats()
}
