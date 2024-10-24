const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: {
        preload: function() {
            // Load assets here if needed
        },
        create: function() {
            // Create a green outline for the CRT effect
            const graphics = this.add.graphics();
            graphics.lineStyle(10, 0x00ff00); // Green color with a thickness of 10
            graphics.strokeRect(50, 50, this.cameras.main.width - 100, this.cameras.main.height - 100); // Draw rectangle

            // Text variables
            const titleText = "Welcome to N.S. Portfolio!"; // h1 text
            const pressStartText = "Press ENTER or Tap to start"; // h2 text

            // Separate displayed text for the title and press start text
            this.titleDisplayedText = ""; // Holds the current part of h1 being displayed
            this.pressStartDisplayedText = ""; // Holds the current part of h2 being displayed

            // Create h1 and h2 text objects (initially empty)
            this.titleTextObject = this.add.text(100, 100, '', { fill: '#00ff00', fontSize: '48px', fontFamily: 'Montserrat' });
            this.pressStartTextObject = this.add.text(100, 160, '', { fill: '#00ff00', fontSize: '32px', fontFamily: 'Montserrat' });

            // Typing effect for h1 (title text)
            this.time.addEvent({
                delay: 100, // Delay between each character
                callback: () => {
                    if (this.titleDisplayedText.length < titleText.length) {
                        // Add one character at a time to titleDisplayedText
                        this.titleDisplayedText += titleText[this.titleDisplayedText.length];
                        this.titleTextObject.setText(this.titleDisplayedText);
                    } else {
                        // Once h1 is fully typed, proceed to h2
                        this.showPressStartText(); 
                    }
                },
                loop: true
            });
        },
        
        // Function to display typing effect for h2 (Press ENTER or Tap to start)
        showPressStartText: function() {
            const pressStartText = "Press ENTER or Tap to start";
            
            // Typing effect for h2 (press start text)
            this.time.addEvent({
                delay: 100, // Delay between each character
                callback: () => {
                    if (this.pressStartDisplayedText.length < pressStartText.length) {
                        // Add one character at a time to pressStartDisplayedText
                        this.pressStartDisplayedText += pressStartText[this.pressStartDisplayedText.length];
                        this.pressStartTextObject.setText(this.pressStartDisplayedText);
                    } else {
                        this.startBlinkingCursor(); // Once typed, show blinking cursor
                        this.addInputListeners(); // Add input listeners after both texts have been typed
                    }
                },
                loop: true
            });
        },

        // Function to display blinking cursor after h2 is fully typed
        startBlinkingCursor: function() {
            // Create a blinking underscore cursor
            this.cursor = this.add.text(100 + this.pressStartTextObject.width, 160, '_', { fill: '#00ff00', fontSize: '32px', fontFamily: 'Montserrat' });
            
            // Set up the blinking effect
            this.time.addEvent({
                delay: 500,
                callback: () => {
                    this.cursor.visible = !this.cursor.visible; // Toggle visibility to create blinking effect
                },
                loop: true
            });
        },

        // Add event listeners for ENTER and screen tap
        addInputListeners: function() {
            // Add listener for the Enter key
            this.input.keyboard.on('keydown-ENTER', () => {
                this.scene.start('gameScene'); // Change to the actual game scene
            });

            // Add listener for tap/click
            this.input.on('pointerdown', () => {
                this.scene.start('gameScene'); // Tap to switch scenes
            });
        },

        update: function() {
            // Update logic here if needed
        }
    }
};

// Define game scene before initializing the game to ensure it’s available
const gameScene = {
    preload: function() {
        // Load game assets here if needed
    },
    create: function() {
        this.add.text(100, 100, 'Game Scene', { fill: '#00ff00', fontSize: '48px', fontFamily: 'Montserrat' });
        // Add game logic here
    },
    update: function() {
        // Game update logic here
    }
};

// Create the game
const game = new Phaser.Game(config);

// Add the game scene immediately so it is available when we want to switch to it
game.scene.add('gameScene', gameScene);



