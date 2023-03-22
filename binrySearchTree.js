


const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }
  


class node {
    constructor(value = null, left= null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}



class tree {
    constructor(arr) {
        this.root = this.buildtree(arr, 0, arr.length - 1);
        this.inOrderValue = [];
        this.preOrderValue = [];
        this.postOrderValue = [];
        prettyPrint(this.root)
        
    }

    buildtree(arr, start, end){
        if (start > end) return null;
        let mid = parseInt((start + end) / 2);
        let root = new node(arr[mid]);

        root.left = this.buildtree(arr, start, mid - 1);
        root.right = this.buildtree(arr, mid + 1, end);
        return root;

    }
    insert(value, root = this.root){
        if (root == null){
            return (root = new node(value));
        }
        if (root.value < value){
            root.right = this.insert(value, root.right);
        } else {
            root.left = this.insert(value, root.left);
        }
        prettyPrint(this.root);
        return root
    };
    delete(value, root = this.root){
        if(root == null){
            return root;
        }
        if (root.value > value){
            root.left = this.delete(value, root.left);
        } else if (root.value < value){
            root.right = this.delete(value, root.right);
        } else {
            if (root.left == null){
                return root.right;
            } else if ( root.right == null){
                return root.left
            }
            root.value = minValue(root.right);
            root.right = this.delete(root.right, root.right);
        }
        prettyPrint(this.root);
        return root
    };
        find(value, root = this.root){
            if (root == null) return false;

            if (root.value == value) return root;

            if (root.value > value){
                return this.find(value, root.left);
            } else if (root.value < value){
                return this.find(value, root.right);
            } 
            prettyPrint(this.root);
            return root
    };

    levelOrder(root = this.root){
        let queue = [];
        let result = [];

        if (root === null) return;
        
        queue.push(root);

        while (queue.length > 0){
            let current = queue.shift(root);
            result.push(current.value);

            if ( current.left !== null) queue.push(current.left);
            if ( current.right !== null) queue.push(current.right);

        }
        console.log("Level Order", result);
        return result;
    };

    inOrder(root = this.root){
        if (root == null) return;

        if (root.left !== null) {
            this.inOrder(root.left)
        }

        if ( root.value !== undefined){
            this.inOrderValue.push(root.value);
        }

        if (root.right !== null) {
            this.inOrder(root.right)
        }
        console.log("Order Value", this.inOrderValue)
    };

    preOrder(root = this.root){
        if (root == null) return;

        if ( root.value !== undefined){
            this.preOrderValue.push(root.value);
        }

        if (root.left !== null) {
            this.preOrder(root.left)
        }

        if (root.right !== null) {
            this.preOrder(root.right)
        }
        console.log("Preorder Value", this.preOrderValue)
    };

    postOrder(root = this.root){
        if (root == null) return;

        if (root.left !== null) {
            this.postOrder(root.left)
        }

        if (root.right !== null) {
            this.postOrder(root.right)
        }

        if ( root.value !== undefined){
            this.postOrderValue.push(root.value);
        }

      
        console.log("Postorder Value", this.postOrderValue)
    };
    
    height(root = this.root){
        if (root == null) {
            return -1;
        } else {
        let left = this.height(root.left);
        let right = this.height(root.right);

        return Math.max(left, right) + 1;
    }
    };

    depth(nodeVal, root = this.root, count = 0){
        if (root == null) return;
        if (root.value === nodeVal) return count;

        if (root.value < nodeVal) {
            return this.depth(nodeVal, root.right, (count + 1));
        } else {
            return this.depth(nodeVal, root.left, (count + 1));
        }

    };

    isBalance(root =  this.root){
        if (root == null) return false;
        let left = root.left;
        let right = root.right;
        if( Math.abs(this.height(left) - this.height(right)) > 1) {
            return false
        } else {
            return true
        }
    };
    rebalance(){
        if (this.isBalance(this.root)) return this.root;

        let balancearr = [];
        balancearr = this.traverse(this.root, balancearr);

        let balanceTree = new tree(balancearr);
        prettyPrint(balanceTree.root)
        console.log("is balance", balanceTree.isBalance());
        return balanceTree.root
    };

    traverse(root, arr){
        if (arr !== undefined) arr.push(root.value);
        if (root.left !== null) {
            this.traverse(root.left, arr);
        }
        return arr;
    };

};

function minValue(root){
    let min = root.value;
    while (root !== null){
        min = root.value;
        root = root.left;
    }

    return min;
}

let balanceTree = new tree ([9,2,5,1,8,7,6,4]);
console.log(balanceTree.find(6));
balanceTree.levelOrder();
balanceTree.inOrder();
balanceTree.preOrder();
balanceTree.postOrder();
console.log(balanceTree.height());
console.log("depth", balanceTree.depth(2));
console.log("is balance", balanceTree.isBalance());
 