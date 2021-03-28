<template>
<div id="employee" class="container">
  <h1 class=" text-center">Simple Crud Operation</h1>
  <div class="row">
    <div class="col-md-6 bg-light text-left">
        <h1>Employee List</h1>
    </div>
    <div class="col-md-6 bg-light text-right">
        <button 
          type="button" 
          class="btn btn-primary" 
          data-toggle="modal" 
          data-target="#oneModal" 
          @click="oneModal"
          >
          Add Modal
        </button>
    </div>
    <ag-grid-vue style="width: 100%; height: 500px;"
        class="ag-theme-alpine"
          :columnDefs="columnDefs"
          :rowData="employees">
    </ag-grid-vue>
  </div>

<!--Step One Modal -->
  <div class="modal fade" id="oneModal" tabindex="-1" role="dialog" aria-labelledby="oneModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="oneModalLabel"> <span v-if="two.id==null"> Add Employee</span><span v-else> Update Employee</span>(Step One)</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form>
                <div class="form-group">
                    <label for="recipient-name" class="col-form-label">First Name:</label>
                    <input type="text" class="form-control" v-model="one.firstName">
                </div>
                <div class="form-group">
                    <label for="recipient-name" class="col-form-label">Second Name:</label>
                    <input type="text" class="form-control" v-model="one.secondName">
                </div>
                <div class="form-group">
                    <label for="recipient-name" class="col-form-label">Phone Number:</label>
                    <input type="number" class="form-control" v-model="one.phoneNumber">
                </div>
                <div class="form-group">
                    <label for="recipient-name" class="col-form-label">Email:</label>
                    <input type="email" class="form-control" v-model="one.email">
                </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary" @click="storeOrUpdateEmployee(one.id)">Next &#8594;</button>
            </div>
            </div>
        </div>
  </div>
  
<!--Step Two Modal -->
  <div class="modal fade" id="twoModal" tabindex="-1" role="dialog" aria-labelledby="twoModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="twoModalLabel"><span v-if="one.id==null"> Add Employee</span><span v-else> Update Employee</span>(Step Two)</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form>
                <div class="form-group">
                    <label for="recipient-name" class="col-form-label">Salary:</label>
                    <input type="number" class="form-control" v-model="two.salary">
                </div>
                <div class="form-group">
                    <label for="recipient-name" class="col-form-label">Date of Birth:</label>
                    <input type="date" class="form-control" v-model="two.dateOfBirth">
                </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-secondary" @click="oneModal(two.id)">&#8592; Previous</button>
                <button type="submit" class="btn btn-primary" @click="updateEmployee" >Submit</button>
            </div>
            </div>
        </div>
  </div>
<!--Delete Modal -->
<div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="deleteModalLabel">Confirmation</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p class="my-2">
          are you sure want to permanently remove this item?
        </p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-danger" @click="deleteEmployee" >Delete</button>
      </div>
    </div>
  </div>
</div>
</div>
</template>
<script>
    import { AgGridVue } from "ag-grid-vue";
    import BtnEdit from "./components/btns/Edit.vue";
    import BtnDelete from "./components/btns/Delete.vue";
    export default {
        name: 'Employee',
        components: {
            AgGridVue,
            BtnEdit,
            BtnDelete,
        },
        data() {
            return {
                columnDefs: null,
                frameworkComponents: null,
                employees: null,
                one:{
                  id : null,
                  firstName : null,
                  secondName : null,
                  phoneNumber : null,
                  email : null,
                },
                two:{
                  id : null,
                  dateOfBirth : null,
                  salary : null
                }
            }
        },
        beforeMount() {
            var _this =this;
            this.employeeList();
            this.columnDefs = [
                { field: 'id', width: 70, },
                { field: 'first_name', width: 120, },
                { field: 'second_name', width: 120, },
                { field: 'phone_number', width: 180, },
                { field: 'email', width: 210, },
                { field: 'date_of_birth',type: 'dateColumn', width: 150, },
                { field: 'salary' , width: 100,},
                { 
                  headerName:"Edit",
                  field: "id",
                  cellRendererFramework: "BtnEdit",
                  cellRendererParams: {
                    clicked: function(field) {
                      _this.oneModal(field);
                    }
                  }, 
                  width: 90,
                },
                { 
                  headerName:"Delete",
                  field: "id",
                  cellRendererFramework: "BtnDelete",
                  cellRendererParams: {
                    clicked: function(field) {
                      _this.one.id = field;
                    }
                  }, 
                  width: 110,
                }
            ];
        },
        methods:{
          employeeList(){
            axios.get('/employees')
            .then(res=>{
            this.employees = res.data
            })
          },
          storeOrUpdateEmployee(id){
            const  _this = this;
            const url= id ? `/employees/${id}` : '/employees'
            const method = id ? 'put' : 'post'
            axios.[method](url, {
              'step':'one',
              'first_name': _this.one.firstName,
              'second_name': _this.one.secondName,
              'phone_number': _this.one.phoneNumber,
              'email': _this.one.email,
            })
            .then(res => {
              this.twoModal(res.data)
              this.$nextTick(() => {
                $('#oneModal').modal('hide')
              })
            })
            .catch(err => {
              this.$toaster.error(Object.values(err.response.data.errors)[0][0])
            });
          },
          updateEmployee(){
            const  _this = this;
            axios.put(`/employees/${_this.two.id}`, {
              'step':'two',
              'date_of_birth': _this.two.dateOfBirth,
              'salary': _this.two.salary,
            })
            .then(res => {
              this.employeeList()
              this.$nextTick(() => {
              this.$toaster.success('Operation Successfull')
              $('#twoModal').modal('hide')
              })
            })
            .catch(err => {
              this.$toaster.error(Object.values(err.response.data.errors)[0][0])
            });
          },
          deleteEmployee(){
            axios.delete(`/employees/${this.one.id}`)
            .then(res => {
              this.employeeList()
              this.$nextTick(() => {
              this.$toaster.success('Operation Successfull')
              $('#deleteModal').modal('hide')
              })
            })
            .catch(err => {
              this.$toaster.error(JSON.stringify(err))
            });
          },
          oneModal(id=null){
            if (typeof id=='number') {
              
              this.one.id = id;
              const employee = this.employees.find(employee=>employee.id == id)
              if (employee) {
              this.one.firstName = employee.first_name;
              this.one.secondName = employee.second_name;
              this.one.phoneNumber = employee.phone_number;
              this.one.email = employee.email;
              }
            } else {
            this.one.id = null;
            this.one.firstName = null;
            this.one.secondName = null;
            this.one.phoneNumber = null;
            this.one.email = null;
            }
            
            $('#twoModal').modal('hide')
            $('#oneModal').modal('show')
          },
          twoModal(id=null){
            if (typeof id=='number') {
              this.two.id = id;
              const employee = this.employees.find(employee=>employee.id == id)
              if (employee) {
                this.two.dateOfBirth = employee.date_of_birth;
                this.two.salary = employee.salary;
              } else{
                this.two.dateOfBirth = null;
                this.two.salary = null;
              }
            }
            $('#twoModal').modal('show')
          }
        }
    }
</script>
<style>
.ag-header-group-cell-label, .ag-header-cell-label {
    display: inline-grid !important;
    flex: 1 1 auto;
    overflow: hidden;
    align-items: center;
    text-overflow: ellipsis;
    align-self: stretch;
}
</style>
