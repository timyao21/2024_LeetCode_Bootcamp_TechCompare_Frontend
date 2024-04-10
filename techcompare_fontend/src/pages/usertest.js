import React from 'react'
import axios from 'axios';

export default class usertest extends React.Component {

    constructor(props) {
        super(props)
    
        this.state = {
             books: []
        }
    }
    
    componentDidMount(){

        const userEmail = 'user123@example.com';
        const apiUrl = `http://localhost:9000/techCompare/User/getUser?email=${encodeURIComponent(userEmail)}`;

        axios.get(apiUrl)
        .then(response => {
            this.setState({ books: response.data });  // Make sure to use response.data
            console.log("You have connected to the server");
            console.log(this.state.books);  // Changed from data to books to reflect the state correctly
        })
        .catch(error => {
            console.log('Response parsing failed. Error: ', error);
        });

    }

    render() {
        return (
            <div>
                <h2 className="text-center">Book Details</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Book Id</th>
                            <th>Book Name</th>
                            <th>Book Author</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                        }
                    </tbody>
                </table>
            </div>
        )
    }
}