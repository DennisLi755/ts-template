// array is contiguous memory
// list is pieces of data that link around
 // blob of something, pointer to another blob

 type LinkedList<T> = {
    push: (element: T) => LinkedList<T>,
    pop: () => LinkedList<T> | undefined,
    top: () => T,
    toString: () => string
};

const LinkedList = <T>(element: T, rest?: LinkedList<T>): LinkedList<T> => {
    return {
        push: (newElement: T) => LinkedList(newElement, LinkedList(element, rest)),
        pop: () => rest,
        top: () => element,
        toString: () => {
            return '' + element + (rest?.toString() || '');
        }
    };
};

const initialList = LinkedList<number>(1);
const oneTwoThree = LinkedList(1, LinkedList(2, LinkedList(3)));
//console.log(oneTwoThree.toString());

//console.log(LinkedList(3).push(2).pop()?.pop()?.push(1));

//console.log('Done!');

// array is contiguous memory
// list is pieces of data that link around
 // blob of something, pointer to another blob

 type InfiniteLinkedList<T> = {
    push: (element: T) => InfiniteLinkedList<T>,
    pop: () => InfiniteLinkedList<T> | undefined,
    top: () => T,
    toString: () => string
};

const InfiniteLinkedList = <T>(element: T, rest?: () => InfiniteLinkedList<T>): InfiniteLinkedList<T> => {
    return {
        push: (newElement: T) => InfiniteLinkedList(newElement, () => InfiniteLinkedList(element, rest)),
        pop: () => rest && rest(),
        top: () => element,
        toString: () => {
            if (rest)
                return '' + element + rest().toString();
            return '' + element
        }
    };
};

const initialList2 = InfiniteLinkedList(1);
const oneTwoThree2 = InfiniteLinkedList(1, () => InfiniteLinkedList(2, () => InfiniteLinkedList(3)));

console.log(oneTwoThree2.toString());

const infiniteNums = (n: number): InfiniteLinkedList<number> => {
    return InfiniteLinkedList(n, () => infiniteNums(n+1));
}

let list = infiniteNums(6);
for (let i = 0; i < 10000000000; i++) {
    if (i %  1000 === 0)
        console.log(list.top());
    list = list.pop() as InfiniteLinkedList<number>;
}