import * as Tone from 'tone'
export default class MusicPlayer {
    constructor() {
      this.samples = {}
      this.synths = {}
      this.setupCode = ''
      this.stepCode = ''
      this.sequencer = {}
      this.stepIndex = 0
      this.stepIndexUpdateCallback = {}
      this.setupCodeChangeTimer = {}
      this.synthsVariablesUpdateCallback = {}
      this.samplesVariablesUpdateCallback = {}
      this.setupCodeErrorCallBack = {}
      this.stepCodeErrorCallback = {}
    }
  
    async initialize(bpm = 60, nbSteps = 10, setupCode ='', stepCode ='', samples = {}){
      //waiting for audio context to start
      await Tone.context.resume()
      //now we can use Tone
    
      this.setupCode = setupCode
      this.stepCode = stepCode
      this.samples = samples
      
      this.sequencer = new Tone.Sequence((time, step)=>{
          this.stepIndex = step
          this.executeStepCode(step)
        }, [...Array(parseInt(nbSteps)).keys()], "16n") 

        Tone.Transport.bpm.value = parseInt(bpm)
        Tone.context.latencyHint = 'fastest'
        Tone.Transport.start()
    }
  
    executeStepCode(step){
        if(this.stepCodeErrorCallBack instanceof Function)
                this.stepCodeErrorCallBack('')
        try{
            eval(this.stepCode)
        }catch(err){
            if(this.stepCodeErrorCallBack instanceof Function)
                this.stepCodeErrorCallBack(err.message) 
        }
    }
  
    executeSetupCode(ToneJS){
        this.synths = {}
        if(this.setupCodeErrorCallBack instanceof Function)
            this.setupCodeErrorCallBack('')
        try{
            eval(this.setupCode)
        }catch(err){
            if(this.setupCodeErrorCallBack instanceof Function)
                this.setupCodeErrorCallBack(err.message) 
        }
        if(this.synthsVariablesUpdateCallback instanceof Function)
            this.synthsVariablesUpdateCallback(Object.keys(this.synths))
    }
  

    get stepIndex() {
        return this._stepIndex
    }

    set stepIndex(step) {
        this._stepIndex = step
        if(this.stepIndexUpdateCallback instanceof Function)
            this.stepIndexUpdateCallback(this._stepIndex)
    }

    get setupCode() {
        return this._setupCode
    }

    set setupCode(code) {
        this._setupCode = code
        //only execute setup code after 1 second of no editor change
        clearTimeout(this.setupCodeChangeTimer);
        this.setupCodeChangeTimer = setTimeout(()=>{this.executeSetupCode(Tone)}, 500); 
    }

    get stepCode() {
        return this._stepCode
    }

    set stepCode(code) {
        
        this._stepCode = code
    }
  

    get stepIndexUpdateCallback() {
        return this._stepIndexUpdateCallback
    }

    set stepIndexUpdateCallback(stepIndexUpdateCallback) {
        this._stepIndexUpdateCallback = stepIndexUpdateCallback
    }

    get synthsVariablesUpdateCallback() {
        return this._synthsVariablesUpdateCallback
    }

    set synthsVariablesUpdateCallback(synthsVariablesUpdateCallback) {
        this._synthsVariablesUpdateCallback = synthsVariablesUpdateCallback
    }

    get setupCodeErrorCallBack() {
        return this._setupCodeErrorCallBack
    }

    set setupCodeErrorCallBack(setupCodeErrorCallBack) {
        this._setupCodeErrorCallBack = setupCodeErrorCallBack
    }

    get stepCodeErrorCallback() {
        return this._stepCodeErrorCallback
    }

    set stepCodeErrorCallback(stepCodeErrorCallback) {
        this._stepCodeErrorCallback = stepCodeErrorCallback
    }

    get samplesVariablesUpdateCallback() {
        return this._samplesVariablesUpdateCallback
    }

    set samplesVariablesUpdateCallback(samplesVariablesUpdateCallback) {
        this._samplesVariablesUpdateCallback = samplesVariablesUpdateCallback
    }

    
  
    set nbSteps(nb){
        this.sequencer.dispose()
        this.sequencer = new Tone.Sequence((time, step)=>{
            this.stepIndex = step
            this.executeStepCode(step)
        }, [...Array(parseInt(nb)).keys()], "16n") 
        this.sequencer.stop()
    }

    set bpm(bpm){
        Tone.Transport.bpm.value = bpm
    }

    set loop(isLoop){
        this.sequencer.loop = isLoop
        this.sequencer.stop()
    }


    loadSamples (samples) {
        for (const [key, sample] of Object.entries(samples)) {
            this.samples[sample.name.split(".")[0].toLowerCase()] = new Tone.Player(URL.createObjectURL(sample)).toMaster()
        }
        if(this.samplesVariablesUpdateCallback instanceof Function)
            this.samplesVariablesUpdateCallback(Object.keys(this.samples))
    }

    removeSample (sampleName) {
        delete this.samples[sampleName]
        if(this.samplesVariablesUpdateCallback instanceof Function)
            this.samplesVariablesUpdateCallback(Object.keys(this.samples))
    }

    get samples() {
        return this._samples
    }

    set samples(samples) {
        this._samples = samples  
    }
  
    play(){
        if (Tone.context.state === 'running'){
            this.sequencer.start()
        }
    }
  
    stop(){
        if (Tone.context.state === 'running'){
            this.sequencer.stop()
        }
    }

    isAudioContextStarted(){
        return Tone.context.state === 'running'
    }

    async startAudioContext(){
        Tone.context.resume()
    }
  }