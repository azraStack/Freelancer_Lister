<template>
  <div class="main">
    <b-container fluid>
      <br>
        <b-row class="text-center">
            <b-col>
                <h2>List of Freelancers</h2>
            </b-col>
        </b-row>
      <br>
      <!-- button for add new freelancer -->
      <br>
        <b-row class="text-center">
            <b-col>
                <b-button type="button" variant="success" @click="showAddFreelancerModal">Add New Freelancer</b-button>
            </b-col>
        </b-row>
      <br>

      <!-- Filter search freelancer section-->
      <b-row class="text-center">
        <b-col>
          <b-form-group
            label="Filter"
            label-for="filter-input"
            label-cols-md="2"
            label-align-md="right"
            label-size="md"
            class="mb-0"
            content-cols-md	="8">
            <b-input-group size="md">
              <b-form-input
                id="filter-input"
                v-model="filter"
                type="search"
                placeholder="Search">
              </b-form-input>
              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>
      <!-- Filter search freelancer section-->
      <hr/>
      <!-- List of freelancer section -->
      <b-row class="listOfFreelancer">
        <b-col>
          <b-table
            striped
            hover
            :items="freelancerlist"
            :fields="field"
            :filter="filter"
            :filter-included-fields="filterOn">

            <template #cell(Actions)="row">
              <button @click="showUpdate(row.item)" size="sm">
                <b-icon icon="pencil-fill" aria-label="Help"></b-icon>
              </button>
              <button @click="showDelete(row.item)" variant="danger" size="sm">
                <b-icon icon="trash2-fill" aria-label="Help"></b-icon>
              </button>
            </template>

          </b-table>
        </b-col>
      </b-row>

      <!-- Modal for adding new freelancer -->
      <b-modal 
        v-model="addFreelancerModal" 
        id="add-freelancer-modal" 
        ref="addFreelancerModal" 
        title="Add New Freelancer" 
        hide-footer>

        <b-form @submit="addNewFreelancer">

          <b-form-group label="Full Name:" label-for="input-fullname">
            <b-form-input
              id="input-fullname"
              v-model="newFreelancer.fullName"
              placeholder="Enter full name"
              required>
            </b-form-input>
          </b-form-group>

          <b-form-group label="Email:" label-for="input-email">
            <b-form-input
              id="input-email"
              v-model="newFreelancer.email"
              type="email"
              placeholder="Enter email"
              required>
            </b-form-input>
          </b-form-group>

          <b-form-group label="Phone Number:" label-for="input-phone_number">
            <b-form-input
              id="input-phone_number"
              v-model="newFreelancer.phone_number"
              placeholder="Enter phone number"
              required>
            </b-form-input>
          </b-form-group>

          <b-form-group label="Skillset:" label-for="input-skillsets">
            <b-form-input
              id="input-skillsets"
              v-model="newFreelancer.skillsets"
              placeholder="Enter skillsets"
              required>
            </b-form-input>
          </b-form-group>

          <b-form-group label="Hobby:" label-for="input-hobby">
            <b-form-input
              id="input-hobby"
              v-model="newFreelancer.hobby"
              placeholder="Enter hobby"
              required>
            </b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary">Add Student</b-button>&nbsp;
          <b-button type="button" @click="closeAddFreelancertModal">Cancel</b-button>

        </b-form>
      </b-modal>
      <!-- Modal for adding new freelancer -->

      <!-- Modal for update freelancer -->
      <b-modal
        id="update-modal"
        ref="updateShow"
        title="Update Freelancer Data"
        hide-footer>
        <b-form @submit="submitUpdateForm" @reset="onReset">
          <b-form-group label="Full Name:" label-for="input-fullname">
            <b-form-input
              id="input-fullname"
              v-model="form.fullname"
              placeholder="Enter new freelancer name"
              required>
            </b-form-input>
          </b-form-group>

          <b-form-group label="Email:" label-for="input-email">
            <b-form-input
              id="input-email"
              v-model="form.email"
              type="email"
              placeholder="Enter new freelancer email"
              required>
            </b-form-input>
          </b-form-group>

          <b-form-group label="Phone Number:" label-for="input-phone_number">
            <b-form-input
              id="input-phone_number"
              v-model="form.phone_number"
              placeholder="Enter new freelancer phone number"
              required>
            </b-form-input>
          </b-form-group>

          <b-form-group label="Skillset:" label-for="input-skillsets">
            <b-form-input
              id="input-skillsets"
              v-model="form.skillsets"
              placeholder="Enter new freelancer skillsets"
              required>
            </b-form-input>
          </b-form-group>

          <b-form-group label="Hobby:" label-for="input-hobby">
            <b-form-input
              id="input-hobby"
              v-model="form.hobby"
              placeholder="Enter new freelancer hobby"
              required>
            </b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary">Submit</b-button>&nbsp;
          <b-button type="reset" variant="danger">Reset</b-button>
          <b-button type="button" @click="close()">Close</b-button>
        </b-form>
      </b-modal>
      <!-- Modal for update freelancer -->

      <!-- Modal for successfully registration message -->
      <b-modal v-model="registrationSuccessModal" class="popup" title="Registration Successful" size="lg">
        Freelancer registration was successful.
      </b-modal>

    </b-container>
  </div>
</template>
  
<script>
  export default {
    head: {
        title: "List Freelancer"
    },
    data(){
      return{
        freelancerlist: [],
        field: [
          {
            key:'id',
            sortable: true
          },
          {
            key:'name',
            sortable: false
          },
          {
            key:'email',
            sortable: false
          },
          {
            key:'phone_number',
            sortable: false
          },
          {
            key:'skillsets',
            sortable: false
          },
          {
            key:'hobby',
            sortable: false
          },
          {
            key:'Actions',
            sortable: false
          },
        ],
        deleteFlag:'',
        selectedID: 0,
        updateShow: false,
        form:{
          fullname:'',
          email: '',
          phone_number: '',
          skillsets: '',
          hobby: ''
        },
        filter: null,
        filterOn: [],
        addFreelancerModal: false,
        newFreelancer: {
          fullName: "",
          email: "",
          phone_number: "",
          skillsets: "",
          hobby: ""
        },
        registrationSuccessModal: false,
      }
    },

    mounted(){
      this.getFreelancers();
    },

    methods: {
      addNewFreelancer(event){
        event.preventDefault();
        let formData = {
          name: this.newFreelancer.fullName,
          email: this.newFreelancer.email,
          phone_number: this.newFreelancer.phone_number,
          skillsets: this.newFreelancer.skillsets,
          hobby: this.newFreelancer.hobby,
        };

        try{
          this.$axios.post('http://localhost:8080/freelancer',formData)
          .then(() => {
            this.showRegistrationSuccessModal(); // Display the success modal
            this.getFreelancers();
          })
        } catch (error){
          console.error(error);
        } finally {
          this.closeAddFreelancertModal();
        }
      },
      getFreelancers(){
        this.$axios.get('http://localhost:8080/freelancers')
        .then(response => {
          this.freelancerlist = response.data
          console.log(this.freelancerlist)
        })
        .catch(error => {
          console.log(error)
        })
      },
      updateFreelancer(selecteditem){
        let itemData = {
          name: this.form.fullname,
          email: this.form.email,
          phone_number: this.form.phone_number,
          skillsets: this.form.skillsets,
          hobby: this.form.hobby,
        }
        console.log(itemData);
        this.$axios.put('http://localhost:8080/freelancer/' + this.selectedID, itemData)
        .then(response => {
          const answer = response.data
          console.log(answer)
          this.getFreelancers();
        })
        .catch(error => {
          console.log(error)
        })
      },
      deleteFreelancer(itemId){
        this.$axios.delete('http://localhost:8080/freelancer/' + itemId)
        .then(response => {
          const answer = response.data
          console.log(answer)
          this.getFreelancers();
        })
        .catch(error => {
          console.log
        })
      },
      submitUpdateForm(event){
        event.preventDefault()
        this.updateFreelancer()
        this.$refs['updateShow'].hide()
      },
      showAddFreelancerModal(){
        this.addFreelancerModal = true;
        this.$refs['addFreelancerModal'].show()
      },
      showUpdate(selecteditem){
        this.selectedID = selecteditem.id
        console.log('this.selectedID :>> ', this.selectedID);
        this.form.fullname = selecteditem.name
        this.form.email = selecteditem.email
        this.form.phone_number = selecteditem.phone_number
        this.form.skillsets = selecteditem.skillsets
        this.form.hobby = selecteditem.hobby
        this.$refs['updateShow'].show()
      },
      showDelete(selecteditem){
        console.log('selecteditem :>> ', selecteditem);
        this.deleteFlag = ''
        const deletename = selecteditem.name
        this.$bvModal.msgBoxConfirm('Are you sure you want to delete ' + deletename + '?')
        .then(value => {
          this.deleteFlag = value
          console.log(this.deleteFlag);
          if (this.deleteFlag) {
            this.deleteFreelancer(selecteditem.id)
          }
        })
        .catch(err => {
            // An error occurred
        })
      },
      closeAddFreelancertModal(){
        this.addFreelancerModal = false; // Set the modal to hidden
            // Reset the input fields in this.newFreelancer for the next use.
            this.newFreelancer = {
                fullName: '',
                email: '',
                phone_number: '',
                skillsets: '',
                hobby: '',
            };
      },
      showRegistrationSuccessModal() {
        this.registrationSuccessModal = true; // Set the modal to visible
      },
      onReset(event){
        event.preventDefault()
        //Reset our form values
        this.form.name = ''
        this.form.email = ''
        this.form.phone_number = ''
        this.form.skillsets = ''
        this.form.hobby = ''
      },
      close(){
        this.$refs['updateShow'].hide()
      },
    }
  }
</script>