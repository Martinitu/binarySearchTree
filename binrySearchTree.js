


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
    

};

function minValue(root){
    let min = root.value;
    while (root !== null){
        min = root.value;
        root = root.left;
    }

    return min;
}

let balanceTree = new tree ([1,2,3,4,5,6,7], 1, 7);
console.log(balanceTree.find(6));