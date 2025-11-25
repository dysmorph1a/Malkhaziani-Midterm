import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchQuery: string = '';
  
  registerForm = {
    name: '',
    email: '',
    password: '',
    age: 0
  };
  
  loginForm = {
    email: '',
    password: ''
  };
  
  loginMessage = '';
  registerMessage = '';

  ngOnInit(): void {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      this.users = JSON.parse(savedUsers);
    }
  }

  register(): void {
    const newUser: User = {
      name: this.registerForm.name,
      email: this.registerForm.email,
      password: this.registerForm.password,
      age: this.registerForm.age
    };
    
    this.users.push(newUser);
    
    localStorage.setItem('users', JSON.stringify(this.users));
    
    this.registerMessage = 'Registration successful!';
    
    this.registerForm = {
      name: '',
      email: '',
      password: '',
      age: 0
    };
  }

  login(): void {
    let userFound = false;
    
    this.users.forEach(user => {
      if (user.email === this.loginForm.email && user.password === this.loginForm.password) {
        userFound = true;
      }
    });
    
    if (userFound) {
      this.loginMessage = 'Login successful!';
    } else {
      this.loginMessage = 'Invalid email or password!';
    }
    
    this.loginForm = {
      email: '',
      password: ''
    };
  }

  searchUsers(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredUsers = [];
      return;
    }
    
    this.filteredUsers = this.users.filter(user => 
      user.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
