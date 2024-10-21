<template>
  <div id="mainGrid">

<div class="mainGridSection"></div>
<div class="mainGridSection centerV">
    <h1 id="title">Notes</h1>

    <div id="buttonsDiv">
        <div class="buttonsDivSection center">
            <img class="menuIcon" src="../public/images/search.svg">
        </div>
        <div class="buttonsDivSection center">
            <img class="menuIcon" src="../public/images/info.svg">
        </div>
    </div>
</div>
<div class="mainGridSection">
    <div id="noNotesYet">
        <img id="noNotesImg" src="../public/images/noNotes.svg">
        <p id="noNotesText">Create your first note !</p>
    </div>

    <div id="addBtn" class="center">
        <img class="menuIcon" src="../public/images/add.svg">
    </div>
</div>

</div>
</template>

<script>

export default {
  name: 'App'
}

</script>