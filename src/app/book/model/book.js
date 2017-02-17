"use strict";
var Book = (function () {
    function Book(id, title, description, fileCoverPic, authorPseudo) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.fileCoverPic = fileCoverPic;
        this.authorPseudo = authorPseudo;
    }
    return Book;
}());
exports.Book = Book;
//# sourceMappingURL=book.js.map