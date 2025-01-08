class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor() {
    this.root = null;
  }

  buildTree(arr) {
    //sort array, remove duplicates and filter none numbers
    if (!arr.length) return null;
    if (arr.length === 1) {
      if (this.root === null) this.root = new Node(arr[0]);
      return new Node(arr[0]);
    }

    arr = arr.filter(n => typeof n === "number").sort((a, b) => a - b);
    arr = arr.filter((n, i) => n !== arr[i - 1]);

    const midIndex = Math.floor(arr.length / 2);
    const leftArr = arr.slice(0, midIndex);
    const rightArr = arr.slice(midIndex + 1);

    let middleNode = new Node(arr[midIndex]);

    //recursive building of trees
    middleNode.left = this.buildTree(leftArr);
    middleNode.right = this.buildTree(rightArr);

    this.root = middleNode;
    return middleNode;
  }

  insert(value) {
    if (typeof value !== "number") return null;
    const insertedNode = new Node(value);
    if (this.root === null) {
      this.root = insertedNode;
      return this.root;
    }

    let currentNode = this.root;
    while (true) {
      if (value > currentNode.data) {
        if (currentNode.right === null) {
          currentNode.right = insertedNode;
          return insertedNode;
        }
        currentNode = currentNode.right;
      } else if (value <= currentNode.data) {
        if (currentNode.left === null) {
          currentNode.left = insertedNode;
          return insertedNode;
        }
        currentNode = currentNode.left;
      }
    }
  }

  delete(value) {
    if (!this.root || typeof value !== "number") return null;

    let currentNode = this.root;
    let found = null;
    let foundIn = "";
    while (!found && currentNode) {
      //check for value and assign location if found
      if (currentNode.data === value) [found, foundIn] = [currentNode, "root"];
      else if (currentNode?.left?.data === value) [found, foundIn] = [currentNode?.left, "left"];
      else if (currentNode?.right?.data === value) [found, foundIn] = [currentNode?.right, "right"];

      if (found) {
        //if no child nodes, make it null
        if (!found.right && !found.left) {
          if (foundIn === "root") this.root = null;
          else if (foundIn === "left") currentNode.left = null;
          else if (foundIn === "right") currentNode.right = null;

          //if only one child, switch between found and child
        } else if ((!found.right && found.left) || (found.right && !found.left)) {
          if (foundIn === "root") this.root = found.right ? found.right : found.left;
          else if (foundIn === "left") currentNode.left = found.right ? found.right : found.left;
          else if (foundIn === "right") currentNode.right = found.right ? found.right : found.left;
          //if value found has two kids
          //get the biggest node on the left tree for a new middle and clean up
        } else if (found.right && found.left) {
          let prevNode = found.left;
          let currentNode = found.left;

          while (currentNode.right) {
            prevNode = currentNode;
            currentNode = currentNode.right;
          }
          if (prevNode === currentNode) {
            found.left = currentNode.left;
            found.data = currentNode.data;
          } else {
            prevNode.right = currentNode.left;
            found.data = currentNode.data;
          }
        }
      }

      if (currentNode.data < value) {
        currentNode = currentNode.right;
      } else if (currentNode.data > value) {
        currentNode = currentNode.left;
      }
    }
    return found;
  }

  _findNode(value) {
    if (!this.root || typeof value !== "number") return null;
    let currentNode = this.root;
    let depth = 0;
    while (currentNode !== null) {
      if (currentNode.data === value) {
        //found node, check for height
        function getHeight(node, height = 0) {
          if (node === null) return height - 1;
          height++;
          let leftHeight = getHeight(node.left, height);
          let rightHeight = getHeight(node.right, height);

          return leftHeight > rightHeight ? leftHeight : rightHeight;
        }

        let height = getHeight(currentNode);

        return { depth, currentNode, height };
      }
      depth++;
      if (currentNode.data < value) {
        currentNode = currentNode.right;
      } else if (currentNode.data > value) {
        currentNode = currentNode.left;
      }
    }
    return { depth: null, currentNode: null, height: null };
  }
  find(value) {
    return this._findNode(value).currentNode;
  }
  depth(value) {
    return this._findNode(value).depth;
  }
  height(value) {
    return this._findNode(value).height;
  }
  levelOrder(callback) {
    if (typeof callback !== "function") throw new Error("provide a callback");
    if (!this.root) return null;
    let queue = [this.root];
    while (queue.length) {
      let newQueue = [];
      queue.forEach(n => {
        if (n.left) newQueue.push(n.left);
        if (n.right) newQueue.push(n.right);

        callback(n);
      });
      queue = newQueue;
    }
  }

  preOrder(callback) {
    this.traversal(callback, "preorder");
  }
  inOrder(callback) {
    this.traversal(callback, "inorder");
  }
  postOrder(callback) {
    this.traversal(callback, "postorder");
  }

  traversal(callback, direction) {
    if (typeof callback !== "function") throw new Error("provide a callback");
    if (!this.root) return null;
    function traverse(node) {
      if (node === null) return;
      if (direction === "preorder") {
        callback(node);
        traverse(node.left);
        traverse(node.right);
      } else if (direction === "inorder") {
        traverse(node.left);
        callback(node);
        traverse(node.right);
      } else if (direction === "postorder") {
        traverse(node.left);
        traverse(node.right);
        callback(node);
      }
    }
    traverse(this.root);
  }

  isBalanced() {
    let isBalanced = true;
    function getDepth(node, depth = 0) {
      if (node === null) return depth;
      depth++;
      let leftDepth = getDepth(node.left, depth);
      let rightDepth = getDepth(node.right, depth);
      if (leftDepth - rightDepth > 1 || rightDepth - leftDepth > 1) isBalanced = false;

      return leftDepth > rightDepth ? leftDepth : rightDepth;
    }

    getDepth(this.root);
    return isBalanced;
  }
  rebalance() {
    const nodes = [];
    this.inOrder(n => nodes.push(n.data));
    this.root = null;
    this.buildTree(nodes);
  }
}

//tests
const myTree = new Tree();
myTree.buildTree([10, 20, 30, 40, 50]);
myTree.insert(25);
myTree.insert(55);
myTree.insert(95);
myTree.insert(30);

console.log(myTree.isBalanced());

prettyPrint(myTree.root);

//TOP PRINT FUNCTION
function prettyPrint(node, prefix = "", isLeft = true) {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
}
