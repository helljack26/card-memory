class CardGame {
    
    // Card content init method
    cardContentInit() {
        $( '.front' ).css( 'background-color', 'white' )
        $( '.side ' ).css( 'background-color', 'white' )
        // Temp Array
        let contentArray = [];
        let cardArray = $( '.back-rgbValue' );
        // Generate rgb string
        for ( let i = 0; i < 6; i++ ) {
            const num = function () {
                return Math.floor( Math.random() * 256 )
            };
            let rgbString = "rgb(" + num() + "," + num() + "," + num() + ")";
            contentArray.push( rgbString )
            contentArray.push( rgbString )
        }
        // Shuffle temp array
        function shuffle( array ) {
            let currentIndex = array.length,
                randomIndex;
            // While there remain elements to shuffle...
            while ( currentIndex != 0 ) {
                // Pick a remaining element...
                randomIndex = Math.floor( Math.random() * currentIndex );
                currentIndex--;
                // And swap it with the current element.
                [ array[ currentIndex ], array[ randomIndex ] ] = [
                    array[ randomIndex ], array[ currentIndex ]
                ];
            }
            return array;
        }
        shuffle( contentArray );
        // Render content to page
        for ( let i = 0; i < cardArray.length; i++ ) {
            cardArray[ i ].innerText = contentArray[ i ]
        }
    }

    // Playing process
    playingProcess() {
        let firstCard, secondCard, count = 0;
        $( '.card' ).click( function () {
            if ( count == 0 ) {
                count++;
                firstCard = this;
                this.classList.remove( 'active' )
                this.classList.add( 'disable' );
            } else if ( count == 1 && this != firstCard ) {
                count++
                this.classList.remove( 'active' );
                $( '.active' ).addClass( 'disable' );
                secondCard = this;
                // Card compare
                let timeout = setTimeout( function () {
                    if ( firstCard.textContent != secondCard.textContent ) {
                        count = 0;
                        firstCard.classList.add( 'active' );
                        secondCard.classList.add( 'active' );
                        firstCard.classList.remove( 'disable' );
                        secondCard.classList.remove( 'disable' );
                    } else {
                        count = 0;
                        firstCard.classList.add( 'disable' );
                        secondCard.classList.add( 'disable' );
                        firstCard.childNodes[ 1 ].style.backgroundColor = firstCard.textContent
                        secondCard.childNodes[ 1 ].style.backgroundColor = secondCard.textContent
                    }
                    $( '.active' ).removeClass( 'disable' );
                    // If win
                    if ( $( '.card' ).filter( '.disable' ).length == 12 ) {
                        $( '.start-button' ).text( 'Start' )
                        const message = document.createElement( 'div' )
                        message.classList.add( 'message' )
                        message.innerHTML = '<p>Yeees!!! You win!</p>'
                        $( '.block-container' ).fadeTo( "slow", 0.2 )
                        $( 'main' ).append( message )
                        $( '.message' ).fadeIn()
                    }
                }, 2000 )
                // If finish click
                $( '.start-button' ).click( function ( e ) {
                    clearTimeout( timeout, 0 )
                    count = 0;
                    if ( e.currentTarget.innerText == 'FINISH' ) {
                        $( '.front' ).css( 'background-color', 'white' )
                        $( '.side ' ).css( 'background-color', 'white' )
                        $( '.block-container' ).fadeTo( "slow", 1 )
                        $( '.message' ).fadeOut()
                        $( '.card' ).removeClass( 'active' );
                        $( '.card' ).removeClass( 'disable' );
                        setTimeout( function () {
                            $( '.card' ).addClass( 'active' );
                        }, 2000 )
                    }
                } )
            }
        } )
    }

    // Start game
    start( btn ) {
        if ( btn.textContent == 'Start' ) {
            btn.textContent = 'Finish'
            btn.style.backgroundColor = 'tomato';
            $( '.card' ).addClass( 'active' )
            this.playingProcess()
        } else if ( btn.textContent == 'Finish' ) {
            btn.textContent = 'Restart';
            btn.style.backgroundColor = 'white';
            $( '.card' ).removeClass( 'active' )
        } else {
            btn.classList.add( 'disable' );
            btn.textContent = 'Finish';
            btn.style.backgroundColor = 'tomato';
            this.cardContentInit()
            $( '.card' ).removeClass( 'disable' )
            setTimeout( function () {
                btn.classList.remove( 'disable' )
                $( '.card' ).addClass( 'active' )
            }, 2000, function () {
                btn.classList.remove( 'disable' )
                this.playingProcess()
            } )
        }
    }
}

const game1 = new CardGame()
game1.cardContentInit()

$( '.start-button' ).click( function () {
    game1.start( this )
} )