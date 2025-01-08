class Node {
  constructor(value = null, next = null) {
    this.value = value;
    this.next = next;
  }
}
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
  prepend(value) {
    const newHead = new Node(value, this.head);
    if (this.size === 0) {
      this.head = newHead;
      this.tail = newHead;
    } else {
      this.head = newHead;
    }

    this.size++;
    return newHead;
  }
  append(value) {
    const newTail = new Node(value, null);
    if (this.size === 0) {
      this.head = newTail;
      this.tail = newTail;
    } else {
      this.tail.next = newTail;
      this.tail = newTail;
    }
    this.size++;
    return this;
  }
  toString() {
    let finalString = "";
    let currentNode = this.head;
    while (currentNode) {
      finalString += `(${currentNode.value})=>`;
      currentNode = currentNode.next;
    }
    return finalString + "null";
  }

  at(index) {
    if (typeof index !== "number" || index >= this.size || index < 0) return null;
    let currentNode = this.head;
    for (let i = 0; i < index; i++) {
      currentNode = currentNode.next;
    }
    return currentNode;
  }

  clean() {
    const prevTail = this.tail;
    this.head = null;
    this.tail = null;
    this.size = 0;
    return prevTail;
  }
  pop() {
    if (this.size <= 0) return null;
    if (this.size === 1) {
      return this.clean();
    }
    const prevTail = this.tail;
    const currentNode = this.at(this.size - 2);
    currentNode.next = null;
    this.tail = currentNode;
    this.size--;

    return prevTail;
  }
  shift() {
    if (this.size <= 0) return null;
    if (this.size === 1) {
      return this.clean();
    }
    const prevHead = this.head;
    this.head = this.head.next;
    this.size--;
    return prevHead;
  }
  contains(value) {
    let currentNode = this.head;
    while (currentNode) {
      if (currentNode.value === value) {
        return true;
      }
      currentNode = currentNode.next;
    }
    return false;
  }
  find(value) {
    let currentNode = this.head;
    for (let i = 0; i < this.size; i++) {
      if (currentNode.value === value) {
        return i;
      }
      console.log(i);
      if (currentNode.next) currentNode = currentNode.next;
    }
    return null;
  }
  insertAt(index, value) {
    if (index > this.size - 1) return this.append(value);
    if (index <= 0) return this.prepend(value);
    const prevNode = this.at(index - 1);
    const newNode = new Node(value, prevNode.next);
    prevNode.next = newNode;
    this.size++;

    return newNode;
  }

  removeAt(index) {
    if (index < 0 || index > this.size - 1 || typeof index !== "number") return null;
    if (index === this.size - 1) return this.pop();
    if (index === 0) return this.shift();
    const prevNode = this.at(index - 1);
    const removedNode = prevNode.next;
    prevNode.next = prevNode.next.next;
    this.size--;
    return removedNode;
  }

  reverse() {
    if (this.size <= 1) return this;

    let currentNode = this.head;
    this.tail = currentNode;
    let nextNode = currentNode.next;
    this.tail.next = null;

    while (nextNode) {
      const temp = currentNode;
      currentNode = nextNode;
      nextNode = nextNode.next;
      currentNode.next = temp;
    }
    this.head = currentNode;
    return this;
  }
}

const list = new LinkedList();

list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");
list.insertAt(2, "hello");
console.log(list.toString());
console.log(list.size);
list.removeAt(2);
console.log(list.toString());
console.log(list.size);

list.find("parrot");
