class LinkedListElement {
    value = null;
    nextMember = null;
    previousMember = null;

    constructor(value, nextMember, previousMember) {
        this.value = value;
        this.nextMember = nextMember;
        this.previousMember = previousMember;
    }
}

class LinkedList {
    #head = null;
    #tail = null;

    addToTail(value) {
        let newMember = null;
        console.log('adding ' + value);
        if(this.#head === null) {
            this.#head = new LinkedListElement(value, null, null);
            this.#tail = this.#head;
        } else if(this.#head.nextMember === null) {
            newMember = new LinkedListElement(value, null, this.#head);
            this.#head.nextMember = newMember;
        } else {
            newMember = new LinkedListElement(value, null, this.#tail)
            this.#tail.nextMember = newMember;
        }
        this.#tail = newMember;
    }

    toArray() {
        let currentMember = this.#head
        const array = [];
        while(currentMember !== null) {
            array.push(currentMember);
            currentMember = currentMember.nextMember;
        }
        return array;
    }

    remove(indexNumber, list) {
        if(indexNumber >= list.length) {
            throw new Error("Nie ma takiego numeru wariacie");
        }
        if(indexNumber === 0) {
            const headToRemove = this.#head;
            const nodeRightToHead = headToRemove.nextMember;
            return this.#head = nodeRightToHead;
        }
        if(indexNumber === list.length - 1) {
            const tailToRemove = this.#tail;
            const nodeLeftToTail = tailToRemove.previousMember;
            nodeLeftToTail.nextMember = null;
            return this.#tail = nodeLeftToTail;
        }
        let currentNode = this.#head;
        for(let i=0; i<indexNumber; i++){
            currentNode = currentNode.nextMember;
        }
        const leftNodeFromRemovedOne = currentNode.previousMember;
        const rightNodeFromRemovedOne = currentNode.nextMember;
        leftNodeFromRemovedOne.nextMember = rightNodeFromRemovedOne;
        rightNodeFromRemovedOne.previousMember = leftNodeFromRemovedOne;
        currentNode = null;
    }
    reverse() {
        let currentMember = this.#head;
        while(currentMember) {
            let currentMembersNextMember = currentMember.nextMember;
            currentMember.nextMember = currentMember.previousMember;
            currentMember.previousMember = currentMembersNextMember;
            this.#head = currentMember;
            currentMember = currentMembersNextMember;
        }
    }
    switchPositions(leftElementIndex, rightElementIndex, list) {
        if((leftElementIndex || rightElementIndex) >= list.length) {
            throw new Error("Nie ma takiego numeru wariacie");
        }
        let currentLeftMember = this.#head;
        let currentRightMember = this.#head;
        for(let i=0; i<leftElementIndex; i++) {
            currentLeftMember = currentLeftMember.nextMember;
        }
        for(let j=0; j<rightElementIndex; j++) {
            currentRightMember = currentRightMember.nextMember;
        }
        const currentLeftMemberNextMember = currentLeftMember.nextMember;
        const currentLeftMemberPreviousMember = currentLeftMember.previousMember;
        currentLeftMember.nextMember = currentRightMember.nextMember;
        if(leftElementIndex === 0) {
            currentLeftMember.previousMember = currentRightMember.previousMember;
            currentRightMember.nextMember = currentLeftMemberNextMember;
            this.#head = currentRightMember;
            currentRightMember.previousMember = currentLeftMemberPreviousMember;
            currentLeftMember.previousMember.nextMember = currentLeftMember;
            return;
        }
        else if(leftElementIndex - rightElementIndex === -1) {
            currentLeftMember.previousMember = currentRightMember;
            currentRightMember.nextMember = currentLeftMember;
        }
        else {
            currentLeftMember.previousMember = currentRightMember.previousMember;
            currentRightMember.nextMember = currentLeftMemberNextMember;
        }
        currentRightMember.previousMember = currentLeftMemberPreviousMember;
        currentLeftMember.previousMember.nextMember = currentLeftMember;
        currentRightMember.previousMember.nextMember = currentRightMember;
    }
    addBetween(previousElementIndex, nextElementIndex) {
        if(previousElementIndex - nextElementIndex !== -1) {
            throw new Error("Input correct indexes");
        }
        let currentLeftMember = this.#head;
        let currentRightMember = this.#head;
        let newMember = null;
        for(let i=0; i<previousElementIndex; i++) {
            currentLeftMember = currentLeftMember.nextMember;
        }
        for(let j=0; j<nextElementIndex; j++) {
            currentRightMember = currentRightMember.nextMember;
        }
        newMember = new LinkedListElement(69, currentRightMember, currentLeftMember);
        currentLeftMember.nextMember = newMember;
        currentRightMember.previousMember = newMember;
    }
}

const list = new LinkedList();
list.addToTail(12);
list.addToTail(5);
list.addToTail(67);
list.addToTail(78);
list.addToTail(99);
list.remove(3, list.toArray());
list.reverse();
list.switchPositions(1,3, list.toArray());
list.addBetween(0,3)
console.log(list.toArray());
