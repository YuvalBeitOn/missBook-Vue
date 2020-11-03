export default {
    template: `
        <header class="app-header flex space-between align-center">
        <router-link to="/" exact><h1>Miss Books</h1></router-link>
        <nav>
            <router-link to="/" exact>Home</router-link>
            <router-link to="/book" exact>Books</router-link>
            <router-link to="/about">About Us</router-link>
        </nav>
</header>
`
}