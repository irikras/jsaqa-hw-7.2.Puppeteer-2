Feature: Booking tickets
    Scenario: Should booking one ticket
        Given user is on "http://qamid.tmweb.ru/client/index.php" page
        When user choose day
        When user choose time
        When user select 5 row 2 seat
        When user choose the booked place
        When user click get reservation code
        Then user received an electronic ticket "Электронный билет"

    Scenario: Should booking two tickets
        Given user is on "http://qamid.tmweb.ru/client/index.php" page
        When user choose day
        When user choose time
        When user select 5 row 6 seat
        When user select 5 row 7 seat
        When user choose the booked place
        When user click get reservation code
        Then user received an electronic ticket "Электронный билет"

    Scenario: Should booking the booked ticket
        Given user is on "http://qamid.tmweb.ru/client/index.php" page
        When user choose day
        When user choose time
        When user choose the booked place
        Then user see button disabled "true"