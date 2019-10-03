const Node = require('./node');

class LinkedList {
    constructor() {
        //start of list
        this._head = null;
        //end of list
        this._tail = null;
        //length og list
        this.length = 0;
    }

    append(data) {
        //Create new node
        let node = new Node(data);
        //Если head пустой, то указываем head и tail на новый node
        if(this._head === null) {
            this._head = node;
            this._tail = node;
            this.length++;
        } else {
            node.prev = this._tail;
            this._tail.next = node;
            this._tail = node;
            this.length++;
        }
        return this;
    }

    head() {
        /*Если node нет, то возвращаем null,
        если есть, то значение head.data */
        if(this._head === null) return null;
        return this._head.data;
    }

    tail() {
        if(this._tail === null) return null;
        return this._tail.data;
    }

    at(index) {
        //Доходи циклом до нудной node и возвращаем её значение
        let count = 0;
        let head = this._head;
        while(count < index) {
            head = head.next;
            count++;
        }
        return head.data;
    }
    /*Создаём новую node и переставляем поочерёдно
    ссылки предыдущего node и последующего*/
    insertAt(index, data) {
        let node = new Node(data);
        let count = 0;
        let head = this._head;
        while(count < index - 1) {
            head = head.next;
            count++;
        }
        if(head !== null) {
            node.next = head.next;
            node.prev = head;
            head.next = node;
            head.next.next.prev = node;
            this.length++;
        }
        return this;

    }

    isEmpty() {
        if(this.length === 0) return true;
        return false;
    }

    clear() {
        this._head = null;
        this._tail = null;
        this.length = 0;
        return this;
    }
    /*Ищем через цикл node и переставляем ссылки рядом
    лежащих node друг на друга*/
    deleteAt(index) {
        let count = 0;
        let head = this._head;
        while(count < index - 1) {
            head = head.next;
            count++;
        }
        if(head.next !== null) {
            head.next = head.next.next;
            head.next.prev = head.next.prev.prev;
        }
        return this;
    }

    reverse() {
        let head = this._head;
        let prev = null;
        while(head) {
            let next = head.next;
            head.next = prev;
            head.prev = next;
            prev = head;
            head = next;
        }
        this._tail = this._head;
        this._head = prev;
        return this;
    }

    indexOf(data) {
        let head = this._head;
        let index = 0;
        while(head !== null) {
            if(head.data === data) return index;
            head = head.next;
            index++;
        }
        return -1;
    }
}

module.exports = LinkedList;
