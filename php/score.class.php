<?php

/**
 * Class Score
 * Permet d'afficher les scores de la base de donnée
 * ou d'en envoyer un
 */

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

    //affichage de l'ensemble des scores
    function getAllFromDB ()
    {
        try {
            $pdo = new PDO('mysql:host='.HOST.';dbname='.DBNAME, USER, PASSWORD);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $result = $pdo->query('SELECT * FROM Scores ORDER BY score DESC');

            $listeScores = array();
            $compteur = 0;

            while ($objet = $result->fetch(PDO::FETCH_OBJ)) {
                array_push($listeScores, $objet);
                $compteur++;

                if($compteur >= 10) {
                    break;
                }
            }

            $final = array("ok" => true, "message" => "requete reussie", "result" => $listeScores);
            $pdo = null;
        } catch (Exception $e) {
            $final = array("ok" => false, "message" => $e->getMessage(), "result" => null);
        }

        return json_encode($final);
    }

    //récupère données de get et les met dans l'objet
    function chargeGET () {
        $this->pseudo = isset($_GET['pseudo']) ? $_GET['pseudo'] : "Wirefox Anonyme";
        $this->score	= isset($_GET['score']) ? $_GET['score'] : NULL ;
    }

    //envoie score dans BDD
    function insertDB () {
        try {
            $pdo = new PDO('mysql:host='.HOST.';dbname='.DBNAME, USER, PASSWORD);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $requete = 'INSERT INTO Scores (pseudo, score)
								VALUES ("'.$this->pseudo.'","'.$this->score.'");';
            $pdo->exec($requete);
            $this->id = $pdo->lastInsertId();

            $pdo = null;
        } catch (Exception $e) {
            //si erreur dans le bloc précédent
            print("<p>Erreur : ".$e->getMessage()."</p>");
            exit;
        }
    }

    function controleur () {
        $action	= isset($_GET['action']) ? $_GET['action'] : NULL ;
        $pseudo = isset($_GET['pseudo']) ? $_GET['pseudo'] : "Wirefox Anonyme";

        switch ($action) {
            case NULL:
            case 'sendScore':
                print($pseudo);
                $this->chargeGET();
                $this->insertDB();
                break;
            case 'view':
                print($this->getAllFromDB());
                break;
        }
    }
}