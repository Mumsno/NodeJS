// const square = (number) => { return number * number };
// console.log(square(3))

const event = {
    name: 'Birthday Party',
    guestList: ['Andrew', 'Jen', 'Moshe'],
    printGuestList() {
        console.log('Guest List For' + this.name);
        
        this.guestList.forEach((guest) => {
            console.log(guest + ' is attending ' + this.name);
            
        });
    }
}

event.printGuestList();