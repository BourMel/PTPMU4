<?php

class Score {
    private $id;
    private $pseudo;
    private $score;

    function __construct()
    {
        $this->id = 0;
        $this->pseudo = "Wirefox Anonyme";
        $this->score = 0;
    }

    //met l'ensemble des scores dans l'objet courant
    function getAllFromDB ()
    {
        try {
            $pdo = new PDO('mysql:host='.'HOST;dbname='.DBNAME, USER, PASSWORD);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $result = $pdo->query('SELECT * FROM Scores');

            $listeScores = array();

            while ($objet = $result->fetch(PDO::FETCH_OBJ)) {
                array_push($listeScores, $objet);
            }

            $final = array("ok" => true, "message" => "requete reussie", "result" => listeScores);

            $pdo = null;
        } catch (Exception $e) {
            $final = array("ok" => false, "message" => $e->getMessage(), "result" => null);
            exit;
        }

        return json_encode($final);
    }

    //affichage
    function affiche() {
        print ($this->id." ".$this->pseudo." ".$this->score);
    }

    //récupère données de get et les met dans l'objet
    function chargeGET () {
        $this->pseudo = $pseudo;
        $this->score = $score;
    }

    //envoie score dans BDD
    function insertDB () {
        try {
            $pdo = new PDO('mysql:host='.'HOST;dbname='.DBNAME, USER, PASSWORD);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            //requête ; la variable compte le nbr de lignes insérées
            $requete = 'INSERT INTO Scores (pseudo, score)
								VALUES (\''.$this->pseudo.'\', \''.$this->score.');';
            $nbr = $pdo->exec($requete);
            $this->id = $pdo->lastInsertId();

            $pdo = null;
        } catch (Exception $e) {
            //si erreur dans le bloc précédent
            print("<p>Erreur : ".$e->getMessage()."</p>");
            exit;
        }
    }

    //controleur
    function controleur () {
        $pseudo = isset($_GET['pseudo']) ? $_GET['pseudo'] : NULL;
        $score	= isset($_GET['score']) ? $_GET['score'] : NULL ;
        $action	= isset($_GET['action']) ? $_GET['action'] : NULL ;

        print($action);

        switch ($action) {
            case NULL:
            case 'sendData':
                print('coucou');
                $this->chargeGET();
                print($this->pseudo);
                $this->insertDB();
                break;
        }
    }
}