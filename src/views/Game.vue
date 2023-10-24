<template>
  <div class="game-container">
    <h1>Ninja Reaction Timer</h1>
    <button
      style="margin: 14px auto"
      class="d-block btn btn-warning"
      @click="play"
      :disabled="playing"
    >
      Play
    </button>
    <div class="container-fluid">
      <div class="row mb-5">
        <div class="col-lg-4">
          <div class="hole">
            <div id="1" class="mole" v-on:click="done">
              <img src="/mole.png" />
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="hole">
            <div id="2" class="mole" v-on:click="done">
              <img src="/mole.png" />
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="hole">
            <div id="3" class="mole" v-on:click="done">
              <img src="/mole.png" />
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4">
          <div class="hole">
            <div id="4" class="mole" v-on:click="done">
              <img src="/mole.png" />
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="hole">
            <div id="5" class="mole" v-on:click="done">
              <img src="/mole.png" />
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="hole">
            <div id="6" class="mole" v-on:click="done">
              <img src="/mole.png" />
            </div>
          </div>
        </div>
      </div>
      <h3 class="text-center">Your Score</h3>
      <p class="text-center" style="height: 10px">
        {{ time ? time + " ms" : "" }}
      </p>
      <h3 class="text-center">High Score</h3>
      <p class="text-center" style="height: 10px">
        {{ time ? time + " ms" : "" }}
      </p>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { AuthStore } from "../stores/AuthStore";

const playing = ref(false);
const show = ref(false);
const time = ref(0);
const stop = ref(true);
const showResults = ref(false);

function play() {
  document.querySelectorAll(".mole").forEach((e) => {
    e.classList.remove("up");
  });
  const random_number = Math.floor(Math.random() * 6) + 1; //Bettween 1 and 6
  const target = document.getElementById(random_number);
  stop.value = false;
  time.value = 0;
  showResults.value = false;
  show.value = false;
  playing.value = true;
  setTimeout(() => {
    show.value = true;
    target.classList.add("up");
    go();
  }, timeToShow());
}
function timeToShow() {
  return Math.floor(2000 + Math.random() * 6000);
}
function go() {
  let score = setInterval(() => {
    if (stop.value) {
      clearInterval(score);
    }
    time.value += 1;
  }, 1);
}
function done() {
  (stop.value = true), (showResults.value = true);
  (show.value = false), (playing.value = false);
}
</script>


<style scoped>
h1 {
  text-align: center;
}

.game-container {
  height: calc(100vh - 150px);
  overflow: auto;
  width: 500px;
  height: 490px;
  margin: 0 auto;
  border: 2px solid #333;
  border-radius: 10px;
  padding: 10px;
}
.holes {
  display: flex;
  flex-wrap: wrap;
}
.hole {
  width: 80%;
  background-color: #333;
  border-radius: 50%;
  margin: 0 auto;
  padding: 10px;
  cursor: pointer;
  overflow: hidden;
}

.hole:hover {
  background-color: #555;
}

.mole {
  transition: all 0.2s;
  width: 100%;
  height: 100%;
  transform: translateY(150%);
}

.up {
  transform: translateY(0);
}

.mole img {
  width: 100%;
  height: 100%;
}

.score {
  text-align: center;
  font-size: 24px;
  margin-top: 20px;
}
</style>



