
import {
    Button, Input, Form, FormItem, Row, Col, Container,
    Aside, Menu, MenuItem,Header, Main, Table, Submenu, 
    TableColumn, Dialog,Pagination, Select, Option, 
    Loading, Switch, Tree,Radio,RadioGroup,Avatar,Upload,
    Icon,Tag,ButtonGroup,Card,Step,Steps,DatePicker
} from 'element-ui'


const arr = [
    Button, Input, Form, FormItem, Row, Col, Container,
    Aside, Menu, MenuItem,Header, Main, Table, Submenu, 
    TableColumn, Dialog,Pagination, Select, Option, 
    Loading, Switch, Tree,Radio,RadioGroup,Avatar,Upload,
    Icon,Tag,ButtonGroup,Card,Step,Steps,DatePicker
]



const element = {
    install: function (Vue) {

       for(let i=0;i<arr.length; i++) {
           Vue.use(arr[i])
       }
   
    }
}

export default element













