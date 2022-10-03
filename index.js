//Exercise choose a data structure suitable for your needs.

//1: clusters
//Suggested data structure: 2d Matrix
//One cluster can be represented by a row
//You can add new cluster by adding new row to the matrix
//Easy to iterate
//Tree has less complexity in searching and inserting new numbers, but there is no way to represent adding new cluster

//2: interface for drag'n'drop representation
//Suggested data structure: tree
//Highly efficient during insert and search operations
//Trees are non linear, so it makes the iteration shorter


//Types of Trees Data Structures
//1. General Tree:
// Can have n numbers of substrees
// The Subtrees are unordered
// 2. Binary Search Tree:
// each node in a tree can have utmost two child nodes.
// Every node in the left subtree must contain a value less than the value of the root node,
// and the value of each node in the right subtree must be bigger than the value of the root node.
// 3. AVL Tree
// Variant of a binary tree
// Balanced binary tree
// Tree is said to be balanced if balance factor of each node is in between -1 to 1
// 4.Red-Black Tree
// Variant of a binary tree
// Self-balancing binary tree
// Similar to AVL tree, but maximum of 2 rotations are required to balance the tree


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
    //Complexity O(1)

    toArray() {
        let currentMember = this.#head
        const array = [];
        while(currentMember !== null) {
            array.push(currentMember);
            currentMember = currentMember.nextMember;
        }
        return array;
    }
    //Complexity O(n)
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
    // Complexity: O(n)
    reverse() {
        let currentMember = this.#head;
        this.#tail = currentMember;
        while(currentMember) {
            let currentMembersNextMember = currentMember.nextMember;
            currentMember.nextMember = currentMember.previousMember;
            currentMember.previousMember = currentMembersNextMember;
            this.#head = currentMember;
            currentMember = currentMembersNextMember;
        }
    }
    //Complexity: O(n)
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
    // Complexity O(2*n)
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
    // Complexity O(2*n)
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
list.addBetween(1,2)
console.log(list.toArray());



// Finish the Graph implementation by adding Edge class
// remove adjecentNodes  array

class GraphNode {
    constructor(value) {
        this.value = value;
        this.id = GraphNode.uuidv4();
    }
    static uuidv4() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }
}

class Edge {
    constructor(edgeValue, start, end) {
        this.edgeValue = edgeValue;
        this.start = start;
        this.end = end;
    }
}

class Graph {
    nodes = [];
    edges = [];
    constructor(firstNode) {
        this.nodes.push(firstNode);
    }

    addNode (value) {
        const newNode = new GraphNode(value);
        this.nodes.push(newNode);
        return newNode;
    }

    addEdge(edgeValue, start, end) {
        const newEdge = new Edge(edgeValue, start, end);
        this.edges.push(newEdge)
        return newEdge;
    }
}

const firstNode = new GraphNode(1);
const graph = new Graph(firstNode);
const secondNode = graph.addNode(2);
const thirdNode = graph.addNode(3);
graph.addEdge(1, firstNode, secondNode)
graph.addEdge(2, secondNode, thirdNode)
graph.addEdge(666, thirdNode, null)
console.log(graph);



