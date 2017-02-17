"use strict";
var BookPage = (function () {
    function BookPage(bookId, numPage, contentText, newPage) {
        this.newPage = true;
        this.bookId = bookId;
        this.numPage = numPage;
        this.contentText = contentText;
        this.newPage = newPage;
    }
    return BookPage;
}());
exports.BookPage = BookPage;
//# sourceMappingURL=bookPage.js.map