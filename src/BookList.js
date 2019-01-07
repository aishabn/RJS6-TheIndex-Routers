import React, { Component } from "react";
import BookTable from "./BookTable";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: this.props.books,
      filteredBooks: this.props.books
    };

    this.filterBooks = this.filterBooks.bind(this);
  }

  filterBooks(query) {
    query = query.toLowerCase();
    let filterBooks = this.state.books.filter(book => {
      return `${book.title}`.toLowerCase().includes(query);
    });
    this.setState({ filteredBooks: filterBooks });
  }

  filterBooksByColor(bookColor) {
    return this.state.filteredBooks.filter(book => book.color === bookColor);
  }

  render() {
    let books = this.state.filteredBooks;
    const bookColor = this.props.match.params.bookColor;

    if (!bookColor) {
      books = this.state.filteredBooks;
    } else {
      books = this.filterBooksByColor(bookColor);
    }

    return (
      <div>
        <SearchBar changeHandler={this.filterBooks} />
        <Link to="/books">
          <button className="btn">All Books</button>
        </Link>
        <BookTable books={books} />
      </div>
    );
  }
}

export default BookList;
