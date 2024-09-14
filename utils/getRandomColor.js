export function getRandomColor(index) {
    // Array of base colors without intensity
    const baseColors = [
        'red', 'blue', 'green', 
        'yellow', 'purple', 'pink',
        'indigo', 'teal', 'orange'
    ];

    // Generate a random number between 200 and 900 (increments of 100)
    const randomIntensity = Math.floor(Math.random() * 5) * 100 + 500;


    // Determine the base color based on the index using modulus
    const colorIndex = index % baseColors.length;
    const selectedColor = baseColors[colorIndex];

    // Return the full Tailwind CSS class for background color
    return `bg-${selectedColor}-${randomIntensity}`;
}
