<template>
  <div class="row">
    <div class="col s10 m6 l4 offset-s1 offset-m3 offset-l4 bg-white card">
      <div class="row">
        <div class="col s12 cabecera">
          <div class="j-pa-md">Send E-mail</div>
        </div>
        <div class="col s12">
          <div class="j-pl-xl j-pr-xl j-pt-md">
            <div class="row">
              <div class="input-field col s12">
                <input
                  placeholder="To"
                  v-model="emails"
                  type="text"
                  :class="!$v.emails.required && error || errorEmail ? 'error' : ''"
                >
              </div>
              <div class="input-field col s12">
                <input placeholder="CC" v-model="cc" type="text" :class="errorCC ? 'error' : ''">
              </div>
              <div class="input-field col s12">
                <input placeholder="BCC" v-model="bcc" type="text" :class="errorBCC ? 'error' : ''">
              </div>
              <div class="input-field col s12">
                <input
                  placeholder="Subject"
                  v-model="subject"
                  :class="!$v.subject.required && error ? 'error' : ''"
                  type="text"
                >
              </div>
              <div class="input-field col s12">
                <textarea
                  placeholder="Message"
                  :class="!$v.message.required && error ? 'error' : ''"
                  v-model="message"
                  class="materialize-textarea"
                ></textarea>
              </div>
              <loadImages type="edit" class="col s12" @removeImage="removeImage" :images="images"/>
              <div class="col s12 relative">
                <div class="left j-mt-sm">
                  <form action="#">
                    <div class="file-field">
                      <a class="btn-floating waves-effect waves-light white">
                        <i class="material-icons black-text">attach_file</i>
                        <input type="file" @change="onFileChange" multiple>
                      </a>
                      <div class="file-path-wrapper display-none">
                        <input class="file-path validate" type="text">
                      </div>
                    </div>
                  </form>
                </div>
                <div class="rigth j-mt-sm">
                  <a
                    class="waves-effect waves-light btn round"
                    :class="isValidEmail ? 'blue-button' : 'grey-button grey-color'"
                    @click="isValidEmail ? sumbit() : ''"
                  >
                    <i class="material-icons left">arrow_forward</i>Send
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loadImages from "../components/load-images.vue";
import { split, map, forEach, remove } from "lodash";
import { required, email } from "vuelidate/lib/validators";
import router from "../route";
import { mapActions } from "vuex";

const components = {
  loadImages
};

const data = () => ({
  images: [],
  emails: "",
  cc: "",
  bcc: "",
  subject: "",
  message: "",
  error: false,
  errorEmail: false,
  errorCC: false,
  errorBCC: false
});

const getEmailsFormat = function getEmailsFormat(emails) {
  if (emails === "") {
    return [];
  }
  return map(split(emails, ","), emailItem => emailItem.replace(/\s/g, ""));
};

const getErrorsEmails = function getErrorsEmails(emails) {
  let value = true;
  forEach(emails, emailItem => {
    value = !email(emailItem) ? false : true;
  });
  return value;
};

const onFileChange = function onFileChange(e) {
  forEach(e.target.files, file => {
    const item = {
      url: URL.createObjectURL(file),
      hover: false,
      file: file
    };
    this.images.push(item);
  });
};

const sumbit = function sumbit() {
  this.$v.$touch();
  this.error = false;
  if (this.$v.$invalid) {
    this.error = true;
    M.toast({ html: "You need complete all fields" });
    // faltan campos reglamentarios por poner
  } else {
    const emails = this.getEmailsFormat(this.emails);
    const cc = this.getEmailsFormat(this.cc);
    const bcc = this.getEmailsFormat(this.bcc);
    this.errorEmail = !this.getErrorsEmails(emails);
    this.errorCC = !this.getErrorsEmails(cc);
    this.errorBCC = !this.getErrorsEmails(bcc);
    if (this.errorEmail || this.errorCC || this.errorBCC) {
      M.toast({ html: "Make sure all the emails are correct" });
      // comprueba que sean tipo email
    } else {
      M.toast({ html: "Sendign email" });
      this.sendMessageData(emails, cc, bcc);
    }
  }
};

const removeImage = function removeImage(url) {
  this.images = remove(this.images, image => image.url !== url);
};

const sendMessageData = async function sendMessageData(emails, cc, bcc) {
  let formData = new FormData();
  forEach(emails, (email, index) => {
    formData.append("emails", email);
  });
  forEach(cc, (item, index) => {
    formData.append("cc", item);
  });
  forEach(bcc, (item, index) => {
    formData.append("bcc", item);
  });
  formData.append("subject", this.subject);
  formData.append("message", this.message.replace(/(?:\r\n|\r|\n)/g, "<br />"));
  forEach(this.images, (image, index) => {
    formData.append("gallery", image.file);
  });
  await this.sendMessage(formData);
  router.push("/email-preview");
};

const methods = {
  getEmailsFormat,
  sendMessageData,
  sumbit,
  removeImage,
  getErrorsEmails,
  onFileChange,
  ...mapActions("messages", ["sendMessage"])
};

const validations = {
  emails: {
    required
  },
  message: {
    required
  },
  subject: {
    required
  }
};

const isValidEmail = function isValidEmail() {
  const email = this.emails.length !== 0;
  const subject = this.subject.length !== 0;
  const message = this.message.length !== 0;
  const value = email && subject && message;
  return value;
};

const computed = {
  isValidEmail
};

export default {
  data,
  components,
  methods,
  validations,
  computed
};
</script>

<style>
</style>
