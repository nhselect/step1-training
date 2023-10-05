<template>
  <div>
    <BackLink :backUrl="`/${role.slug}`">
      Back to training materials
    </BackLink>
    <h1>
      Setup and Utilisation process maps
      <span class="nhsuk-caption-xl">{{ role ? role.title : '' }}</span>
    </h1>
    <div class="nhsuk-u-reading-width">
      <p class="nhsuk-body-s nhsuk-u-secondary-text-color">
        Last changed: {{ page ? page.updatedAt : false  | formatDate }}
      </p>
    </div>
    <nuxt-content :document="page" />
    <hr v-if="!isLearner" />
    <div v-if="!isLearner" class="nhsuk-grid-row step1-process--questions">
      <div class="step1-process--questions__container nhsuk-grid-column-full">
        <div class="nhsuk-u-reading-width">
          <div>
            <p class="nhsuk-body-l">
              Please answer these questions, so we can highlight the parts of the process that are relevant for you.
            </p>
            <p><strong>If unsure, please leave the question blank</strong></p>
          
            <client-only>
            <form>

              <div class="nhsuk-form-group">

                <fieldset class="nhsuk-fieldset">
                  <legend class="nhsuk-fieldset__legend nhsuk-fieldset__legend--m">
                    <h4 class="nhsuk-fieldset__heading">
                      Are you primarily based in a Trust or Higher Education Institute (HEI)?
                    </h4>
                  </legend>

                  <div class="nhsuk-radios">

                    <div
                      v-for="opt in sitesOptions"
                      :key="opt.value"
                      class="nhsuk-radios__item"
                      >
                      <input
                        v-model="site"
                        class="nhsuk-radios__input"
                        :id="'site-'+opt.value"
                        :name="'site-'+opt.value"
                        type="radio"
                        :value="opt.value"
                      >
                      <label
                        class="nhsuk-label nhsuk-radios__label"
                        :for="'site-'+opt.value"
                      >
                        {{ opt.text }}
                      </label>
                    </div>

                  </div>
                </fieldset>

              </div>

              <div class="nhsuk-form-group">

                <fieldset class="nhsuk-fieldset" aria-describedby="roles-hint">
                  <legend class="nhsuk-fieldset__legend nhsuk-fieldset__legend--m">
                    <h4 class="nhsuk-fieldset__heading">
                      Which role/s will you be performing?
                    </h4>
                  </legend>

                  <div class="nhsuk-hint" id="rolesHint">
                    Select all options that are relevant to you.
                  </div>

                  <div class="nhsuk-checkboxes">

                    <div
                      v-for="opt in rolesOptions"
                      :key="opt.value"
                      class="nhsuk-checkboxes__item"
                      >
                      <input
                        v-model="roles"
                        class="nhsuk-checkboxes__input"
                        :id="'role-'+opt.value"
                        :name="'role-'+opt.value"
                        type="checkbox"
                        :value="opt.value"
                      >
                      <label
                        class="nhsuk-label nhsuk-checkboxes__label"
                        :for="'role-'+opt.value"
                      >
                        {{ opt.text }}
                      </label>
                    </div>

                  </div>
                </fieldset>
              </div>

              <div v-if="isCCM || isImplementationLead" class="nhsuk-form-group">

                <fieldset class="nhsuk-fieldset">
                  <legend class="nhsuk-fieldset__legend nhsuk-fieldset__legend--m">
                    <h4 class="nhsuk-fieldset__heading">
                      Will your organisation have more than one Clinical Centre Manager?
                    </h4>
                  </legend>

                  <div class="nhsuk-hint" id="rolesHint">
                    <b>Note:</b> We recommend you do, in order to help with cover during absence or high workload
                  </div>

                  <div class="nhsuk-radios">

                    <div
                      v-for="opt in radioOptions"
                      :key="'multiCCM-'+opt.value"
                      class="nhsuk-radios__item"
                      >
                      <input
                        v-model="multiCCM"
                        class="nhsuk-radios__input"
                        :id="'multiCCM-'+opt.value"
                        :name="'multiCCM-'+opt.value"
                        type="radio"
                        :value="opt.value"
                        >
                      <label
                        class="nhsuk-label nhsuk-radios__label"
                        :for="'multiCCM-'+opt.value"
                        >
                        {{ opt.text }}
                      </label>
                    </div>

                  </div>
                </fieldset>

              </div>
 
              <div v-if="(isCCM || isImplementationLead) && hasMultiCCM" class="nhsuk-form-group">

                <fieldset class="nhsuk-fieldset">
                  <legend class="nhsuk-fieldset__legend nhsuk-fieldset__legend--m">
                    <h4 class="nhsuk-fieldset__heading">
                      Has anyone in your team already been promoted to a Clinical Centre Manager in the platform?
                    </h4>
                  </legend>

                  <div class="nhsuk-radios">

                    <div
                      v-for="opt in radioOptions"
                      :key="'notFirstCCM-'+opt.value"
                      class="nhsuk-radios__item"
                      >
                      <input
                        v-model="notFirstCCM"
                        class="nhsuk-radios__input"
                        :id="'notFirstCCM-'+opt.value"
                        :name="'notFirstCCM-'+opt.value"
                        type="radio"
                        :value="opt.value"
                        >
                      <label
                        class="nhsuk-label nhsuk-radios__label"
                        :for="'notFirstCCM-'+opt.value"
                        >
                        {{ opt.text }}
                      </label>
                    </div>

                  </div>

                  <div v-if="hasMultiCCM && isFirstCCM" class="nhsuk-hint">
                    You will need to select one Clinical Centre Manager to be setup first on the platform (this may be you). Once they have been set up, the additional Clinical Centre Managers can easily be added.
                  </div>
                </fieldset>

              </div>

              <div v-if="(isCCM || isImplementationLead) && !isAdmin" class="nhsuk-form-group">

                <fieldset class="nhsuk-fieldset">
                  <legend class="nhsuk-fieldset__legend nhsuk-fieldset__legend--m">
                    <h4 class="nhsuk-fieldset__heading">
                      Will your organisation have anyone in the Centre Administrator role?
                    </h4>
                  </legend>

                  <div class="nhsuk-radios">

                    <div
                      v-for="opt in radioOptions"
                      :key="'hasAdmin-'+opt.value"
                      class="nhsuk-radios__item"
                      >
                      <input
                        v-model="hasAdmin"
                        class="nhsuk-radios__input"
                        :id="'hasAdmin-'+opt.value"
                        :name="'hasAdmin-'+opt.value"
                        type="radio"
                        :value="opt.value"
                        >
                      <label
                        class="nhsuk-label nhsuk-radios__label"
                        :for="'hasAdmin-'+opt.value"
                        >
                        {{ opt.text }}
                      </label>
                    </div>

                  </div>
                </fieldset>

              </div>

              <div v-if="(isCCM || isImplementationLead || isAdmin) && isTrust" class="nhsuk-form-group">

                <fieldset class="nhsuk-fieldset">
                  <legend class="nhsuk-fieldset__legend nhsuk-fieldset__legend--m">
                    <h4 class="nhsuk-fieldset__heading">
                      How will your Trust get staff registered as delegates on the platform?
                    </h4>
                  </legend>

                  <div class="nhsuk-radios">

                    <div
                      v-for="opt in regOptions"
                      :key="'regMethod-'+opt.value"
                      class="nhsuk-radios__item"
                      >
                      <input
                        v-model="regMethod"
                        class="nhsuk-radios__input"
                        :id="'regMethod-'+opt.value"
                        :name="'regMethod-'+opt.value"
                        type="radio"
                        :value="opt.value"
                        >
                      <label
                        class="nhsuk-label nhsuk-radios__label"
                        :for="'regMethod-'+opt.value"
                        >
                        {{ opt.text }}
                      </label>
                    </div>

                  </div>
                </fieldset>

              </div>

              <div v-if="isCCM || isImplementationLead || isEM" class="nhsuk-form-group">

                <fieldset class="nhsuk-fieldset">
                  <legend class="nhsuk-fieldset__legend nhsuk-fieldset__legend--m">
                    <h4 class="nhsuk-fieldset__heading">
                      Who will promote Assessors into their roles on the platform?
                    </h4>
                  </legend>

                  <div class="nhsuk-radios">

                    <div
                      v-for="opt in promoOptions"
                      :key="'promoMethod-'+opt.value"
                      class="nhsuk-radios__item"
                      >
                      <input
                        v-model="promoMethod"
                        class="nhsuk-radios__input"
                        :id="'promoMethod-'+opt.value"
                        :name="'promoMethod-'+opt.value"
                        type="radio"
                        :value="opt.value"
                        >
                      <label
                        class="nhsuk-label nhsuk-radios__label"
                        :for="'promoMethod-'+opt.value"
                        >
                        {{ opt.text }}
                      </label>
                    </div>

                  </div>
                </fieldset>

              </div>

            </form>
          </client-only>
          </div>
          
        </div>
      </div>
    </div>
    <hr />
    <div class="nhsuk-grid-row step1-process">
      <div class="step1-process__container nhsuk-grid-column-three-quarters">

        <!--
          INITIAL CENTRE SETUP
        -->

        <details
          v-if="!isLearner"
          class="nhsuk-details"
          :class="{
            'process-section--required' : isFirstCCM
          }"
          :open="isFirstCCM && isCCM"
          >
          <summary class="nhsuk-details__summary">
            <h2 class="nhsuk-details__summary-text">
              1: Initial centre setup
            </h2>
            <p class="nhsuk-caption-m nhsuk-u-reading-width process-step--header-text">
              Setting up the first Clinical Centre Manager, and configuring the centre details. Actions needed by the <ProcessRole :roles="{firstcentremanager:true,nccentremanager:true}" />
            </p>
            <p class="nhsuk-caption-m nhsuk-u-reading-width process-step--header-text">
              This step of the process should only need to be completed once, by your organisations's first Clinical Centre Manager
            </p>
          </summary>
          <div class="nhsuk-details__text">

            <ProcessNode step=1 :required="isFirstCCM" :actionBy="['firstcentremanager']" :roles="roles">
              <p>
                <span v-if="isFirstCCM">As the <ProcessRole :roles="{firstcentremanager:true}" /> you will need to </span>
                <span v-else>The <ProcessRole :roles="{firstcentremanager:true}" /> will</span> self-register as a delegate on the platform
              </p>
            </ProcessNode>

            <ProcessNode v-if="isFirstCCM" step=2 :actionBy="['nccentremanager']" :roles="roles">
              <p>
                If self-registering using a computer within your organisation, registration will be approved automatically.
              </p>
              <p>
                Otherwise, registration will need to be approved by an existing <ProcessRole :roles="{nccentremanager:true}" />
              </p>
              <p class="process-important">
                <b>Don't know who your Non-clinical centre manager is?</b> Contact Learningnetwork@nhselect.org.uk for details
              </p>
            </ProcessNode>

            <ProcessNode step=3 :required="isFirstCCM" :actionBy="['nccentremanager']" :roles="roles">
              <p>The <ProcessRole :roles="{nccentremanager:true}" /> will promote {{ isFirstCCM ? "you" : "the first Clinical Centre Manager" }} to the Centre Manager role on the platform</p>
            </ProcessNode>

            <ProcessNode step=3 :required="isFirstCCM" :actionBy="['firstcentremanager']" :roles="roles">
              <p>{{ isFirstCCM ? "You" : "The first Clinical Centre Manager" }} will need to configure your Centre details.</p>
              <p>These will include some setup questions specific to your organisation which will then be presented to new delegates registering on the platform.</p>
            </ProcessNode>

          </div>
        </details>

        <!--
          CENTRE MANAGER / ADMINISTRATOR SETUP
        -->

        <details
          v-if="!isLearner"
          class="nhsuk-details"
          :class="{
            'process-section--required' : isCCM || (hasAdminRole && isCCM || isAdmin)
          }"
          :open="isCCM || isAdmin">
          <summary class="nhsuk-details__summary">
            <h2 class="nhsuk-details__summary-text">
              2: {{ hasMultiCCM ? "Additional " : "" }}<ProcessRole :roles="{centremanager:hasMultiCCM||(!hasMultiCCM&&!hasAdminRole),administrator:hasAdminRole||(!hasMultiCCM&&!hasAdminRole)}" /> setup
              <span class="nhsuk-caption-m nhsuk-u-reading-width process-step--header-text">
                Setting up any additional <ProcessRole :roles="{centremanager:hasMultiCCM,administrator:hasAdminRole}" or /> roles and configuring the Centre details. Actions needed by the <ProcessRole :roles="{centremanager:true}" />
              </span>
            </h2>
          </summary>

          <div class="nhsuk-details__text">

            <ProcessNode :required="isCCM" :roles="roles" :actionBy="['centremanager']">
              <p>
                An existing Clinical Centre Manager should share the relevant role training package with the new delegate before they register on the platform
              </p>
            </ProcessNode>

            <ProcessNode :required="isAdmin || (isCCM && !isFirstCCM)" :roles="roles"  :actionBy="['centremanager','administrator']">
              <p>
                The new delegate completes the pre-reading materials in the training package and completes the self declaration before accessing the platform
              </p>
            </ProcessNode>

            <ProcessNode :roles="roles" :required="isCCM" :actionBy="['centremanager']">
              <p v-if="['both','self'].includes(regMethod) || !regMethod">
                An existing Clinical Centre Manager tells the new delegate to self-register for a profile on the platform
              </p>
              <p v-if="(!regMethod || regMethod === 'both') && isTrust">
                <strong>or</strong>
              </p>
              <p v-if="(['both','behalf'].includes(regMethod) || !regMethod) &&isTrust">
                An existing Clinical Centre Manager registers the new delegate with a profile on the platform
              </p>
            </ProcessNode>

            <ProcessNode v-if="['both','self'].includes(regMethod) || !regMethod" :actionBy="['centremanager']" :roles="roles">
              <p>
                If self-registering using a computer within your organisation, registration will be approved automatically.
              </p>
              <p>
                Otherwise, registration will need to be approved by an existing <ProcessRole :roles="{nccentremanager:true}" />
              </p>
            </ProcessNode>

            <ProcessNode :roles="roles" :required="isCCM" :actionBy="['centremanager']">
              <p>
                An existing Clinical Centre Manager promotes the new delegate to the <ProcessRole :roles="{centremanager:hasMultiCCM,administrator:hasAdminRole}" :or="true" /> role on the platform
              </p>
            </ProcessNode>

          </div>
        </details>

        <!--
          EDUCATOR / ASSESSOR SETUP 
        -->

        <details
          v-if="!isLearner"
          class="nhsuk-details"
          :class="{
            'process-section--required' : ((isCCM && ([null,'both','centremanager'].includes(promoMethod))) || (isEM && ([null,'both','educator'].includes(promoMethod))) || isEM || isAssessor)
          }"
          open
          >
          <summary class="nhsuk-details__summary">
            <h2 class="nhsuk-details__summary-text">
              3: <ProcessRole :roles="{educator:true,assessor:true}" />
               setup
               <span class="nhsuk-caption-m nhsuk-u-reading-width process-step--header-text">
                Setting up any <ProcessRole :roles="{educator:true,assessor:true}" /> roles. Actions needed by the <ProcessRole :roles="{centremanager:true,educator:true}" or />
              </span>
            </h2>
          </summary>

          <div class="nhsuk-details__text">

            <ProcessNode :roles="roles" :actionBy="['centremanager','administrator','educator']" :required="isCCM || isAssessor || isEM || isAssessor">
              <p>
                An existing admin role (e.g. <ProcessRole :roles={centremanager:true,administrator:true,educator:true} :or="true" />) shares the relevant role training package with {{ isEM || isAssessor ? 'you' : 'the new delegate'}}
              </p>
            </ProcessNode>

            <ProcessNode :required="isEM || isAssessor" :roles="roles"  :actionBy="['educator','assessor']">
              <p>
                {{ isEM || isAssessor ? 'You should complete' : 'The new delegate completes'}} the pre-reading materials in the training package and the self declaration before accessing the platform
              </p>
            </ProcessNode>

            <ProcessNode :roles="roles" :actionBy="['centremanager']" :required="isEM || isAssessor || isCCM">
              <p v-if="['both','self'].includes(regMethod) || !regMethod">
                An existing Clinical Centre Manager directs {{ isEM || isAssessor ? 'you' : 'the new delegate'}} to self-register for a profile on the platform
              </p>
              <p v-if="(!regMethod || regMethod === 'both') && isTrust">
                <strong>or</strong>
              </p>
              <p v-if="(['both','behalf'].includes(regMethod) || !regMethod) && isTrust">
                An existing Clinical Centre Manager registers {{ isEM || isAssessor ? 'you' : 'the new delegate'}} with a profile on the platform
              </p>
            </ProcessNode>

            <ProcessNode v-if="['both','self'].includes(regMethod) || !regMethod" :actionBy="['centremanager']" :roles="roles"  :required="isEM || isAssessor || isCCM">
              <p>
                If self-registering using a computer within your organisation, registration will be approved automatically.
              </p>
              <p>
                Otherwise, registration will need to be approved by an existing <ProcessRole :roles="{nccentremanager:true}" />
              </p>
            </ProcessNode>

            <ProcessNode :actionBy="['centremanager','administrator']" :required="((isCCM && ([null,'both','centremanager'].includes(promoMethod))) || (isEM && ([null,'both','educator'].includes(promoMethod))))" :roles="roles" >
              <p>
                The <ProcessRole :roles="{centremanager:[null,'both','centremanager'].includes(promoMethod),educator:[null,'both','educator'].includes(promoMethod)}" or /> promotes {{ isEM || isAssessor ? 'you' : 'the new delegate'}} to the relevant <ProcessRole :roles="{educator:true,assessor:true}" or /> role on the platform
              </p>
            </ProcessNode>
            
          </div>
        </details>

        <!--
          LEARNER SETUP
        -->

        <details
          class="nhsuk-details"
          :class="{
            'process-section--required' : (isEM || isLearner)
          }"
          :open="isEM || isAssessor || isLearner"

          >
          <summary class="nhsuk-details__summary">
            <h2 class="nhsuk-details__summary-text">
              4: Learner setup
              <span class="nhsuk-caption-m nhsuk-u-reading-width process-step--header-text">
                Setting up Learners on the platform and enrolling them onto the proficiencies. Actions needed by the <ProcessRole :roles="{educator:true,assessor:true}" or />
              </span>
            </h2>
          </summary>
          <div class="nhsuk-details__text">

            <ProcessNode step=1 :required="isEM || isLearner" :actionBy="['educator']" :roles="roles">
              <p>
                An <ProcessRole :roles="{educator:true}" /> shares the Learner training package with {{ isLearner ? "you" : "the new delegate" }}
              </p>
            </ProcessNode>

            <ProcessNode :roles="roles" :required="isLearner" :actionBy="['centremanager']">
              <p v-if="['both','self'].includes(regMethod) || !regMethod">
                An existing Clinical Centre Manager directs {{ isLearner ? "you" : "the new delegate" }} to self-register for a profile on the platform
              </p>
              <p v-if="(!regMethod || regMethod === 'both') && isTrust">
                <strong>or</strong>
              </p>
              <p v-if="(['both','behalf'].includes(regMethod) || !regMethod) && isTrust">
                An existing Clinical Centre Manager registers {{ isLearner ? "you" : "the new delegate" }} with a profile on the platform
              </p>
            </ProcessNode>

            <ProcessNode v-if="['both','self'].includes(regMethod) || !regMethod" :required="isLearner" :actionBy="['centremanager']" :roles="roles">
              <p>
                If self-registering using a computer within your organisation, registration will be approved automatically.
              </p>
              <p>
                Otherwise, registration will need to be approved by an existing <ProcessRole :roles="{nccentremanager:true}" />
              </p>
            </ProcessNode>

            <ProcessNode step=3 :roles="roles" :actionBy="['educator']" :required="isEM">
              <p>The <ProcessRole :roles="{educator:true}" /> adds {{ isLearner ? "you" : "Learners that they will manage" }}  to their Staff list</p>
            </ProcessNode>

            <ProcessNode step=3 :roles="roles" :actionBy="['educator']" :required="isEM && isTrust">
              <p>The <ProcessRole :roles="{educator:true}" /> in the Trust enrolls {{ isLearner ? "you" : "the Learners" }} onto the relevant proficiencies framework.</p>
              <p>Note: the Trust has reponsibility for enrolling learners onto proficiencies, not the HEI.</p>
            </ProcessNode>

          </div>
        </details>

        <!--
          LEARNER COMPLETION
        -->

        <details
          class="nhsuk-details"
          :class="{
            'process-section--required' : (isEM || isAssessor || isLearner)
          }"
          :open="isEM || isAssessor || isLearner"
          >
          <summary class="nhsuk-details__summary">
            <h2 class="nhsuk-details__summary-text">
              5: Learner proficiencies completion
              <span class="nhsuk-caption-m nhsuk-u-reading-width process-step--header-text">
                The process for Learners to self-assess and complete their proficiencies. Actions needed by the <ProcessRole :roles="{learner:true,educator:true,assessor:true}" or />
              </span>
            </h2>
          </summary>
          <div class="nhsuk-details__text">

            <ProcessNode step=1 :roles="roles" :required="isLearner" :actionBy="['learner']">
              <p>
                {{ isLearner ? "You launch" : "The Learner launches" }} the proficiencies self-assessment
              </p>
            </ProcessNode>

            <ProcessNode step=1 :roles="roles" :required="isLearner" :actionBy="['learner']">
              <p>
                {{ isLearner ? "Complete your" : "The Learner completes their" }} Learning contract and {{ isLearner ? "start" : "starts" }} self-assessing proficiencies
              </p>
            </ProcessNode>

            <ProcessNode step=1 :roles="roles" :required="isLearner" :actionBy="['learner']">
              <p>
                {{ isLearner ? "Send your" : "The Learner sends their" }} self-assessed 'achieved' proficiencies to {{ isLearner ? "your" : "their" }} Educator/Manager or Assessor for confirmation
              </p>
            </ProcessNode>

            <ProcessNode step=1 :roles="roles" :actionBy="['educator','assessor']" :required="isEM || isAssessor">
              <p>
                The Educator/Manager or Assessor confirms {{ isLearner ? "your" : "the Learner's" }} self-assessed as 'achieved' proficiencies
              </p>
            </ProcessNode>

            <ProcessNode step=1 :roles="roles" :required="isLearner" :actionBy="['learner']">
              <p>
                {{ isLearner ? "Request" : "The Learner requests" }} final sign-off from {{ isLearner ? "your" : "their" }} Educator/Manager when all proficiencies have been achieved and confirmed
              </p>
            </ProcessNode>

            <ProcessNode step=1 :roles="roles" :actionBy="['educator']" :required="isEM">
              <p>
                The Educator/Manager performs the final sign-off
              </p>
            </ProcessNode>

            <ProcessNode step=1 :required="isLearner" :roles="roles">
              <p>
                {{ isLearner ? "You receive" : "The Learner receives" }} certification of completion for their proficiencies
              </p>
            </ProcessNode>

          </div>
        </details>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  filters: {
    formatDate: (dateStr) =>
      dateStr ? Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(new Date(dateStr)) : ''
  },
  scrollToTop: true,
  async asyncData({ $content, params, error }) {
    // fetch role info content
    const role = await $content('roles/' + params.role)
      .fetch()
      .catch((err) => {
        error({ statusCode: 404, message: err })
      })

    // fetch current page content
    const page = await $content('process/' + params.role)
      .fetch()
      .catch((err) => {
        error({ statusCode: 404, message: err })
      })

    const isLearner = role && role.slug === 'learner'
    
    return {
      isLearner,
      role,
      page,
    }
  },
  data() {
    return {
      roles: [],
      site: 'trust',
      notFirstCCM: null,
      multiCCM: null,
      hasAdmin: null,
      regMethod: '',
      promoMethod: '',
      rolesOptions: [
        {
          value: 'implementationlead',
          text: 'Implementation Lead (note: this is not a role on the platform)',
        },
        {
          value: 'centremanager',
          text: 'Clinical Centre Manager',
        },
        {
          value: 'administrator',
          text: 'Centre Administrator',
        },
        {
          value: 'educator',
          text: 'Educator/Manager',
        },
        {
          value: 'assessor',
          text: 'Assessor',
        },
      ],
      sitesOptions: [
        {
          value: 'trust',
          text: 'Trust'
        },
        {
          value: 'hei',
          text: 'Higher Education Insitute (HEI)'
        }
      ],
      radioOptions: [
        {
          value: true,
          text: 'Yes',
        },
        {
          value: false,
          text: 'No',
        },
        {
          value: null,
          text: 'Unsure'
        }
      ],
      regOptions: [
        {
          value: 'self',
          text: 'Ask them to self-register',
        },
        {
          value: 'behalf',
          text: 'Register them on their behalf',
        },
        {
          value: 'both',
          text: 'Both (self-register and on their behalf)',
        },
        {
          value: null,
          text: 'Unsure'
        }
      ],
      promoOptions: [
        {
          value: 'centremanager',
          text: 'Clinical Centre Managers',
        },
        {
          value: 'educator',
          text: 'Educator/Managers',
        },
        {
          value: 'both',
          text: 'Both',
        },
        {
          value: null,
          text: 'Unsure'
        }
      ]
    }
  },
  computed: {
    isFirstCCM() {
      if (this.roles && this.roles.includes('centremanager')) {
        if (this.notFirstCCM !== null) {
          return !this.notFirstCCM
        } 
        if (this.multiCCM === false) {
          return true
        }
      }
      return false
    },
    hasMultiCCM() {
      if (this.multiCCM !== null) {
        return this.multiCCM
      }
      return true
    },
    hasAdminRole() {
      if ((this.roles && this.roles.includes('administrator')) || this.hasAdmin || this.hasAdmin === null) {
        return true
      }
      return false
    },
    isCCM() {
      return this.roles && this.roles.includes('centremanager')
    },
    isAdmin() {
      return this.roles && this.roles.includes('administrator')
    },
    isEM() {
      return this.roles && this.roles.includes('educator')
    },
    isAssessor() {
      return this.roles && this.roles.includes('assessor')
    },
    isImplementationLead() {
      return this.roles && this.roles.includes('implementationlead')
    },
    isTrust() {
      return this.site && this.site === 'trust'
    }
  },
  created() {
    if (!process.server && this.role) {
      this.roles.push(this.role.slug)
    }
  },
  head() {
    return {
      title:
        'Digitised proficiencies - Process map',
    }
  },
}
</script>

<style lang="scss">
@import 'node_modules/nhsuk-frontend/packages/components/back-link/back-link';
@import 'node_modules/nhsuk-frontend/packages/components/fieldset/fieldset';
@import 'node_modules/nhsuk-frontend/packages/components/checkboxes/checkboxes';
@import 'node_modules/nhsuk-frontend/packages/components/radios/radios';
@import 'node_modules/nhsuk-frontend/packages/components/hint/hint';
@import 'node_modules/nhsuk-frontend/packages/components/details/details';
@import 'node_modules/nhsuk-frontend/packages/components/inset-text/inset-text';
@import 'node_modules/nhsuk-frontend/packages/components/error-summary/error-summary';

.nhsuk-radios__item {
  float: left;
  clear: none;
  margin-right: 32px;
}

.nhsuk-hint {
  clear: both;
}

div.step1-process__node:not(.step1-process__node--required) {
  background-color: $color_nhsuk-grey-5;
  border-color: $color_nhsuk-grey-3;

  > .nhsuk-card__content {
    p {
      color: $color_nhsuk-grey-2;
    }
  }
}

.nhsuk-details__summary-text {
  text-decoration: none !important;

    span.process-step--header-text {
    text-decoration: none !important;
  }
}


p.process-important {
  color: $color_nhsuk-dark-pink !important;
}

details:not(.process-section--required) {
  h2 {
    color: $color_nhsuk-grey-2 !important;
    text-decoration: none !important;
  }
}

</style>
